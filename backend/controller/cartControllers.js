import Cart from "../models/cartModel.js";


export const totalCarts=async(req,res)=>{
    try{
        const carts=await Cart.find({})
        res.status(200).json(carts)
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}


export const userTotalCart=async(req,res)=>{
    const {id}=req.params;
    try{
        const carts=await Cart.findOne({
            user:id
        }).populate('products.product', ['name', 'description','category','image','discountPrice' ,'totalPrice'])
        .exec();
        res.status(200).json(carts)
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}


export const createCart=async(req,res)=>{
    const {user,product} = req.body;
    try{
        const checkIfExists = await Cart.findOne({ user: user });
        if(checkIfExists){
            const addinExits=await Cart.findByIdAndUpdate(
                checkIfExists._id,
                {
                    $push: {
                        products: product,
                    },
                },
                { new: true } // To return the updated document
            );
            res.status(200).json({message:"Cart Updated"})
        }else{
            const newCart=new Cart({
                user: user,
                products: product,
            });
            
            const result=await newCart.save();
            if(!result){
                res.status(400).json({message:"Cart Not Created"})
            }
            res.status(200).json({message:"Cart Created",result:result})
        }
       
        
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const deleteCart=async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await Cart.findByIdAndDelete(id);
        if(!result){
            res.status(400).json({message:"Cart Not Deleted"})
        }
        res.status(200).json({message:"Cart Deleted",result:result})
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

export const updateCart=async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await Cart.findByIdAndUpdate(id,req.body,{new:true});
        if(!result){
            res.status(400).json({message:"Cart Not Updated"})
        }
        res.status(200).json({message:"Cart Updated",result:result})
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
}

