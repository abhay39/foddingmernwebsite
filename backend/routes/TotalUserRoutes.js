import express from 'express';
import { getTotalUsers } from '../controller/TotalUsersController.js';

const route=express.Router();

route.get("/totalUsers",getTotalUsers)

export default route;