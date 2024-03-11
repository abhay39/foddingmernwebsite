import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    // console.log("working")
    const {name,email,password}=req.body;
    try{
        const checkIfUserExists =await User.findOne({
            email: email
        });
        if(checkIfUserExists){
            res.status(400).json({message: "User already exists"});
            return;
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password: hashedPassword,
            profilePicture: `https://avatar.iran.liara.run/public/boy?username=${name}`
        });
        await newUser.save();
        res.status(200).json({message: "User created successfully"});
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const checkIfUserExists =await User.findOne({
            email: email
        });
        if(!checkIfUserExists){
            res.status(400).json({message: "User does not exist"});
            return;
        }
        const isMatch=await bcrypt.compare(password,checkIfUserExists.password);
        if(!isMatch){
            res.status(400).json({message: "Password does not match"});
            return;
        }
        const token=jwt.sign(
            {"id":checkIfUserExists._id},
            process.env.JWT_SECRET,{expiresIn:'7d'}
        )

    
        
        res.status(200).json({message: "User logged in successfully",token:token});
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}

export const usersGrowth = async(req,res)=>{
    try {
        const getTotalUsers = await User.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    newUserCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]);
    
        const usersWithGrowth = getTotalUsers.map((currentDay, index) => {
            if (index === 0) {
                return { ...currentDay, growthPercentage: 0 }; // No growth for the first day
            }
        
            const previousDay = getTotalUsers[index - 1];
            const rawGrowthPercentage = ((currentDay.newUserCount - previousDay.newUserCount) / previousDay.newUserCount) * 100;
            const growthPercentage = parseFloat(rawGrowthPercentage.toFixed(3));
        
            return { ...currentDay, growthPercentage };
        });

        const sortedUsersWithGrowth = usersWithGrowth.sort((a, b) => {
            const dateA = new Date(a._id.year, a._id.month - 1, a._id.day);
            const dateB = new Date(b._id.year, b._id.month - 1, b._id.day);
            return dateB - dateA;
        });

        const usersLength=await User.countDocuments();


        res.status(200).json({
            message: "Total Users By This Month",
            sortedOrdersWithGrowth:sortedUsersWithGrowth,
            orderLength:usersLength
            
        })
    
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
    
}