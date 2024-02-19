import express from 'express';
import User from '../models/userModel.js';
import { login, register } from '../controller/userController.js';

const router = express.Router();

router.post('/register',register);
router.post('/signin',login);


export default router;