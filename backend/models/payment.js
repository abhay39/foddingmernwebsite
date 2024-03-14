import mongoose from "mongoose";

const PaymentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    source:{
        type:String,
        required:true,
        enum:['esewa','khalti'],
        default:'esewa'
    },
    source_payment_id:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

const Payment=mongoose.model('Payment',PaymentSchema)

export default Payment;