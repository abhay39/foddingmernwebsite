import mongoose from "mongoose";

const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    profilePicture:{
        type:String,
        default:null
    },
    cart:{
        type:Array,
        default:[]
    },
    orders:{
        type:Array,
        default:[]
    },
    reservations:{
        type:Array,
        default:[]
    },
    whistlists:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const User=mongoose.model("User",UserModel);

export default User;