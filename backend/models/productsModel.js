import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    discountPrice:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    
    addedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        // unique:true
    }
},{timestamps:true})

const Product= mongoose.model("Product", ProductModel)

export default Product;