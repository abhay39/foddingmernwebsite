import express from 'express';
import { esewaPaymentVerify, getTotalPayments, khaltiPay, khaltiPaymentVerify } from '../controller/paymentsControllers.js';

const router=express.Router();

router.post("/user/khaltiPay",khaltiPay);
router.post("/user/khaltiPay/verify-payment",khaltiPaymentVerify);
router.post("/user/esewaPay",khaltiPay);
router.post("/user/esewaPay/verify-payment",esewaPaymentVerify);
router.get("/admin/getTotalPayments",getTotalPayments);


export default router;