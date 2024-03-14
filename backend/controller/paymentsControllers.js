import axios from "axios";
import Cart from "../models/cartModel.js";
import Payment from "../models/payment.js";
import Order from "../models/orderModel.js";
import {parseString } from 'xml2js'
import { connectMongo } from "../index.js";

export const khaltiPay=async(req,res)=>{
    const KHALTI_URL = process.env.KHALTI_URL;
 
    try{
        await connectMongo()
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

export const khaltiPaymentVerify = async (req, res) => {
    const KHALTI_URL = process.env.KHALTI_URL;
    const data = req.body;
    // console.log(data);

    try {
        await connectMongo()
        let result = await axios.post(`${KHALTI_URL}/epayment/lookup/`, data.pidx, {
            headers: {
                Authorization: `key ${process.env.secret_key}`
            }
        })

        if (!result) {
            res.json({
                status: false,
                message: "Something went wrong",
                // result:result
            })
        }
        // console.log(result.data)

        if (result?.data?.status === 'Completed') {
            // Check if a payment with the same source_payment_id already exists
            const existingPayment = await Payment.findOne({ source_payment_id: result.data.pidx });

            if (existingPayment) {
                // Payment already exists, handle accordingly (maybe update status or log a message)
                console.log('Payment already exists in the database');
                res.json({
                    message: "Order was successfully placed and verified"
                });
            } else {
                // Payment doesn't exist, create a new payment entry
                const newpayment = new Payment({
                    user: data.user,
                    source: 'khalti',
                    source_payment_id: result.data.pidx,
                    amount: result.data.total_amount / 100,
                    order: data.orderId,
                    status: result.data.status
                });

                const isDone = await newpayment.save();

                if (isDone) {
                    const findOrderById = await Order.findById(data.orderId);
                    if (findOrderById) {
                        findOrderById.status = "paid and processing";
                        findOrderById.save();
                    }
                    const removerFromCart = await Cart.findOneAndDelete({
                        user: data.user
                    });

                    if (removerFromCart) {
                        console.log('Document removed successfully');
                    }
                }
                res.json({
                    message: "Order was successfully placed and verified"
                });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message })
    }
}


export const esewaPaymentVerify = async (req, res) => {
    const data = req.body;
    console.log(data)

    try {
        await connectMongo()
        let result = await axios.post(`https://uat.esewa.com.np/epay/transrec`, data.params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        let jsonResult;
        parseString(result.data, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err.message);
                return;
            }
            jsonResult = result;
        });

        let finalMsg = jsonResult.response.response_code;

        if (finalMsg !== "failure") {
            const existingPayment = await Payment.findOne({ source_payment_id: result.data.pidx });
            
            if (existingPayment) {
                console.log('Payment already exists in the database');
            } else {
                const newpayment = new Payment({
                    user: data.user,
                    source: 'esewa',
                    source_payment_id: data.params.rid,
                    amount: data.params.amt,
                    order: data.params.pid,
                    status: "Completed",
                });

                const isDone = await newpayment.save();
                console.log(isDone)

                if (isDone) {
                    const findOrderById = await Order.findById(data.params.pid);
                    if (findOrderById) {
                        findOrderById.status = "paid and processing";
                        findOrderById.save();
                    }
                    const removerFromCart = await Cart.findOneAndDelete({
                        user: data.user
                    });

                    if (removerFromCart) {
                        console.log('Document removed successfully');
                    } 
                }
                res.json({
                    message: "Order was successfully placed and verified"
                });
            }
        } else {
            res.json({
                status: false,
                message: "Something went wrong",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
};



export const getTotalPayments=async(req,res)=>{
    try{
        await connectMongo()
        const allPayments = await Payment.find();
        res.status(200).json(allPayments);
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

