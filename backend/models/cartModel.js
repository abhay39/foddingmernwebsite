import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
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
                default:1
            }
        }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartModel);

export default Cart;
