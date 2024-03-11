import express from 'express';
import { getTotalUsers, getUserDetails } from '../controller/TotalUsersController.js';
import { usersGrowth } from '../controller/userController.js';

const route=express.Router();

route.get("/admin/totalUsers",getTotalUsers)
route.get("/admin/totalUsers/userGrowth",usersGrowth)
route.get("/getUser/:token",getUserDetails)

export default route;