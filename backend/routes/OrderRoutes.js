import express from 'express';
import { createOrder, deleteOrder, salesAllDay, salesByThisMonth, totalOrders, updateOrder, userTotalOrder } from '../controller/OrderControllers.js';

const router=express.Router();

router.get("/admin/totalOrders",totalOrders);
router.get("/admin/totalOrders/salesByThisMonth",salesByThisMonth);
router.get("/admin/totalOrders/salesAllDay",salesAllDay);
router.get("/user/totalOrder/:id",userTotalOrder);

router.post("/user/createOrder",createOrder);
router.put("/admin/updateOrder/:id",updateOrder);
router.delete("/admin/deleteOrder/:id",deleteOrder);

export default router;