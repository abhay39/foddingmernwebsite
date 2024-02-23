import express from 'express';
import User from '../models/userModel.js';
import { getUserDetails, login, register } from '../controller/userController.js';

const router = express.Router();

router.post('/register',register);
router.post('/signin',login);
router.get('/:token',getUserDetails);


export default router;