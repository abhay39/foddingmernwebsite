import express from 'express';
import { khaltiPay, khaltiPaymentVerify } from '../controller/paymentsControllers.js';

const router=express.Router();

router.post("/user/khaltiPay",khaltiPay);
router.post("/user/khaltiPay/verify-payment",khaltiPaymentVerify);
router.post("/user/esewaPay",khaltiPay);


export default router;