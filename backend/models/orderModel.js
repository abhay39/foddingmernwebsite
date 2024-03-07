import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    payment_method:{
        type:String,
        required:true,
        default:'khalti'
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ],
    status:{
        type:String,
        required:true,
        enum:['created','paid and processing','shipping','delivered'],
        default:'created'
    },
    amount:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        // required:true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);

export default Order;
