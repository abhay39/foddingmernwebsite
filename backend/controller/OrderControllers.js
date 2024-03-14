import { connectMongo } from "../index.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const totalOrders=async(req,res)=>{
    try{
        await connectMongo()
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
        await connectMongo()
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
        await connectMongo()
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
        await connectMongo()
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
        await connectMongo()
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




export const salesByThisMonth = async(req,res)=>{
    try{
        await connectMongo()
        const getTotalOrer=await Order.aggregate([
            {
                $group:{
                    _id:{
                        year:{$year:"$createdAt"},
                        month:{$month:"$createdAt"},
                        day:{$dayOfMonth:"$createdAt"}
                    },
                    total:{$sum:"$amount"}
                }
            },
            {
                $sort:{
                    '_id.year':1,
                    '_id.month':1,
                    '_id.day':1,
                }
            }
        ])

        const ordersWithGrowth = getTotalOrer.map((currentDay, index) => {
            if (index === 0) {
                return { ...currentDay, growthPercentage: 0 }; // No growth for the first day
            }
        
            const previousDay = getTotalOrer[index - 1];
            const rawGrowthPercentage = ((currentDay.total - previousDay.total) / previousDay.total) * 100;
            const growthPercentage = parseFloat(rawGrowthPercentage.toFixed(3));
        
            return { ...currentDay, growthPercentage };
        });

        const sortedOrdersWithGrowth = ordersWithGrowth.sort((a, b) => {
            const dateA = new Date(a._id.year, a._id.month - 1, a._id.day);
            const dateB = new Date(b._id.year, b._id.month - 1, b._id.day);
            return dateB - dateA;
        });

        const orderLength=await Order.countDocuments();


        res.status(200).json({
            message: "Total Sales By This Month",
            sortedOrdersWithGrowth:sortedOrdersWithGrowth,
            orderLength:orderLength
        })

    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const salesAllDay = async (req, res) => {
    try {
        await connectMongo()
        const getTotalOrder = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                }
            }
        ]);

        const ordersWithGrowth = getTotalOrder.map((currentDay, index) => {
            if (index === 0) {
                return { ...currentDay, growthPercentage: 0 }; // No growth for the first day
            }

            const previousDay = getTotalOrder[index - 1];
            const rawGrowthPercentage = ((currentDay.total - previousDay.total) / previousDay.total) * 100;
            const growthPercentage = parseFloat(rawGrowthPercentage.toFixed(3));

            return { ...currentDay, growthPercentage };
        });

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const salesData = monthNames.map((monthName, index) => {
            const monthIndex = index; // Adjusting to zero-based index
            const matchingOrder = ordersWithGrowth.find(order => order._id.month - 1 === monthIndex);

            return {
                month: monthName,
                sales: matchingOrder ? matchingOrder.total : 0,
                growthPercentage: matchingOrder ? matchingOrder.growthPercentage : 0
            };
        });

        res.status(200).json({
            message: "Total Sales By This Month",
            ordersWithGrowth: salesData,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}
