import express from 'express';
import { createOrder, deleteOrder, totalOrders, updateOrder, userTotalOrder } from '../controller/OrderControllers.js';

const router=express.Router();

router.get("/admin/totalOrders",totalOrders);
router.get("/user/totalOrder/:id",userTotalOrder);

router.post("/user/createOrder",createOrder);
router.put("/admin/updateOrder/:id",updateOrder);
router.delete("/admin/deleteOrder/:id",deleteOrder);

export default router;