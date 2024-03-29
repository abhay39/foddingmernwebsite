import express from 'express';
import { createCart, deleteCart, getCartGrowth, totalCarts, updateCart, userTotalCart } from '../controller/cartControllers.js';

const router=express.Router();

router.get("/admin/totalCarts",totalCarts);
router.get("/admin/totalCarts/cartGrowth",getCartGrowth);
router.get("/user/totalCarts/:id",userTotalCart);

router.post("/user/createCart",createCart);
router.put("/user/updateCart/:id",updateCart);
router.delete("/user/deleteCart/:id",deleteCart);

export default router;