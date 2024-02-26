import express from 'express';
import { addProduct } from '../controller/ProductsController.js';

const route=express.Router();

route.post("/addProduct",addProduct);

export default route;