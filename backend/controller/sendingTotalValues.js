import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const sendingTotalValues=async(req,res)=>{
    try{

        // cartvalues
        const getCartOrder=await Cart.aggregate([
            {
                $group:{
                    _id:{
                        year:{$year:"$updatedAt"},
                        month:{$month:"$updatedAt"},
                        day:{$dayOfMonth:"$updatedAt"}
                    },
                    newCartCount: { $sum: 1 }
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

        const cartsWithGrowth = getCartOrder.map((currentDay, index) => {
            if (index === 0) {
                return { ...currentDay, growthPercentage: 0 }; // No growth for the first day
            }

            const previousDay = getTotalOrder[index - 1];
            const growthPercentage = ((currentDay.newCartCount - previousDay.newCartCount) / previousDay.newCartCount) * 100;

            return { ...currentDay, growthPercentage };
        });


        // uservalues
        

    }catch(e){
        console.log(e);
    }
}