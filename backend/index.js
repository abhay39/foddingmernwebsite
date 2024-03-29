import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/UserRoute.js';
import totalUsers from './routes/TotalUserRoutes.js';
import productRoute from './routes/ProductRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import cartRoutes from './routes/CartRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';
import getAllValues from './routes/getAllValues.js';
import mongoose from 'mongoose';
import cors from 'cors';


const app=express();
dotenv.config();
app.use(express.json())


const allowedOrigins = ['http://localhost:3000', 'https://pouuuu.vercel.app'];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

export const connectMongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        // console.log("Connected to MongoDB");

    }catch(err){
        console.log(err);
    }
}

const PORT=process.env.PORT || 5000;

app.get('/',async(req,res)=>{
    res.send('Hello World');
});

app.use("/api/auth",userAuth);
app.use("/api/users",totalUsers)
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoutes)
app.use("/api/carts",cartRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/getAllValues",getAllValues)


connectMongo()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

export default app;