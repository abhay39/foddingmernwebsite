import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/UserRoute.js';
import totalUsers from './routes/TotalUserRoutes.js';
import productRoute from './routes/ProductRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import cartRoutes from './routes/CartRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';


const app=express();
dotenv.config();
app.use(express.json())
app.use(cors())

export const connectMongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use("/api/auth",userAuth);
app.use("/api/users",totalUsers)
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoutes)
app.use("/api/carts",cartRoutes)
app.use("/api/payments",paymentRoutes)


await connectMongo()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});