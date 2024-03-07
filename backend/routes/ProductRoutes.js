import express from 'express';
import { addProduct, deleteProduct, getDishesWithCategory, getDishesWithCategoryAndPrice, totalProductsList, updateProduct } from '../controller/ProductsController.js';

const route=express.Router();

route.post("/addProduct",addProduct);
route.put("/updateProduct",updateProduct);
route.delete("/deleteProduct/:token",deleteProduct);
route.get("/listofproducts",totalProductsList);
route.get("/listofproducts/:category",getDishesWithCategory);
route.get("/listofproducts/:category/:price",getDishesWithCategoryAndPrice);

export default route;