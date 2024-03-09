import Order from "../models/orderModel.js";

export const totalOrders=async(req,res)=>{
    try{
        const orders=await Order.find({})
        res.status(200).json(orders)
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}


export const userTotalOrder=async(req,res)=>{
    const {id}=req.params;
    try{
        const orders=await Order.find({
            user:id
        })
        res.status(200).json(orders)
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}


export const createOrder=async(req,res)=>{
    // console.log(req.body);
    try{
        const newOrder=new Order(req.body);
        const result=await newOrder.save();
        if(!result){
            res.status(400).json({message:"Order Not Created"})
        }
        res.status(200).json({message:"Order Created",result:result})
        // console.log(result);
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const deleteOrder=async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await Order.findByIdAndDelete(id);
        if(!result){
            res.status(400).json({message:"Order Not Deleted"})
        }
        res.status(200).json({message:"Order Deleted",result:result})
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const updateOrder=async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await Order.findByIdAndUpdate(id,req.body,{new:true});
        if(!result){
            res.status(400).json({message:"Order Not Updated"})
        }
        res.status(200).json({message:"Order Updated",result:result})
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

