import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    console.log("working")
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
        res.status(201).json({message: "User created successfully"});
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
            {"id":isMatch._id},
            process.env.JWT_SECRET,{expiresIn:'7d'}
        )
        res.status(200).json({message: "User logged in successfully",token:token});
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}