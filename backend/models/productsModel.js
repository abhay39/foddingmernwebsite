import mongoose from "mongoose"

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
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
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default:0
    },
    addedBy: {
        type: String,
        required: true
    }
},{timestamps:true})

const Product= mongoose.model("Product", ProductModel)

export default Product;