import express from 'express';
import { addProduct, getDishesWithCategory, getDishesWithCategoryAndPrice, totalProductsList, updateProduct } from '../controller/ProductsController.js';

const route=express.Router();

route.post("/addProduct",addProduct);
route.put("/updateProduct",updateProduct);
route.get("/listofproducts",totalProductsList);
route.get("/listofproducts/:category",getDishesWithCategory);
route.get("/listofproducts/:category/:price",getDishesWithCategoryAndPrice);

export default route;