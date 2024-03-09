import axios from "axios";
import Cart from "../models/cartModel.js";
import Payment from "../models/payment.js";
import Order from "../models/orderModel.js";



export const khaltiPay=async(req,res)=>{
    const KHALTI_URL = process.env.KHALTI_URL;
 
    try{
        const payload = req.body;
        let result = await axios.post(`${KHALTI_URL}/epayment/initiate/`,payload,{
            headers:{
                Authorization:`key ${process.env.secret_key}`
            }
        })
        
        if(!result){
            res.json({
            status: false,
            message: "Something went wrong",
            // result:result
            })
        }
            // console.log(result.data)            
        res.json({
            status: true,
            data: result?.data
        })
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const khaltiPaymentVerify=async(req,res)=>{
    const KHALTI_URL = process.env.KHALTI_URL;
    const data = req.body;
    console.log(data);

    try{
        let result = await axios.post(`${KHALTI_URL}/epayment/lookup/`,data.pidx,{
            headers:{
                Authorization:`key ${process.env.secret_key}`
            }
        })
        
        if(!result){
            res.json({
            status: false,
            message: "Something went wrong",
            // result:result
            })
        }
    console.log(result.data)            
        if(result?.data?.status==='Completed'){
            const newpayment=new Payment({
                user:data.user,
                source:'khalti',
                source_payment_id:result.data.pidx,
                amount:result.data.total_amount/100,
                order:data.orderId,
                status:result.data.status
            })
            const isDone=await newpayment.save();
            if(isDone){
                const findOrderById=await Order.findById(data.orderId);
                if(findOrderById){
                    findOrderById.status="paid and processing";
                    findOrderById.save();
                }
                const removerFromCart = await Cart.findOneAndDelete({
                    user: data.user
                });
                
                if (removerFromCart) {
                    console.log('Document removed successfully');
                } else {
                    console.log('Document not found');
                }
            }
            res.json({
                "message":"Order was successfully placed and verified"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

