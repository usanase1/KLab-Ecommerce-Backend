import { createProduct , getProductById, getProducts, updateProduct, deleteProduct }  from "../controllers/productController";
 import express from "express";

 const productRouter = express.Router();

 productRouter.post("/create", createProduct);

 productRouter.get("/", getProducts);
 productRouter.get("/", getProductById);

 productRouter.put("/:id", updateProduct)

 productRouter.delete("/:id", deleteProduct)

 export default productRouter