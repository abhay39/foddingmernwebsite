import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';


export const getTotalUsers=async(req,res)=>{
    try{
        const totalUsers=await User.find();
        res.json(totalUsers)
    }catch(e){
        console.log(e);
    }
}

export const getUserDetails = async(req, res) =>{
    const {token}=req.params;

    try{
        const verifyUser=jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyUser){
            res.status(400).json({message: "Invalid token"});
            return;
        }
        const isUser=(await User.findById(verifyUser.id));
        
        if(!isUser){
            res.status(400).json({message: "User does not exist"});
            return;
        }
        res.status(200).json(isUser);
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}