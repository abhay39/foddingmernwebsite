import express from 'express';
import { getTotalPayments, khaltiPay, khaltiPaymentVerify } from '../controller/paymentsControllers.js';

const router=express.Router();

router.post("/user/khaltiPay",khaltiPay);
router.post("/user/khaltiPay/verify-payment",khaltiPaymentVerify);
router.post("/user/esewaPay",khaltiPay);
router.get("/admin/getTotalPayments",getTotalPayments);


export default router;