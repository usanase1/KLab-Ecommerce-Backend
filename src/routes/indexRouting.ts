import productRouter from "./productPath";
import express from "express";
import {Router} from "express";
import categoryRouter from "./categoryPath";
import cartRouter from "./cartPath";
import orderRouter from "./orderPath";
import userRouter from "./userPath";

const mainRouter = Router();


mainRouter.use("/cart", cartRouter);

mainRouter.use('/categories', categoryRouter);

mainRouter.use('/product', productRouter)

mainRouter.use("/orders", orderRouter);
mainRouter.use("/user", userRouter)


export default mainRouter;