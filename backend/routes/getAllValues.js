import express from 'express';
import { sendingTotalValues } from '../controller/sendingTotalValues.js';

const router=express.Router();

router.get("/admin/getTotalValues",sendingTotalValues)

export default router;