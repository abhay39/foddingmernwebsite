import User from "../models/userModel.js";

export const getTotalUsers=async(req,res)=>{
    try{
        const totalUsers=await User.find();
        res.json(totalUsers)
    }catch(e){
        console.log(e);
    }
}