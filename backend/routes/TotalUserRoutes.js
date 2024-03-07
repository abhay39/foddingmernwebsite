import express from 'express';
import { getTotalUsers, getUserDetails } from '../controller/TotalUsersController.js';

const route=express.Router();

route.get("/totalUsers",getTotalUsers)
route.get("/getUser/:token",getUserDetails)

export default route;