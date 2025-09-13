import { signin } from "../controllers/userController";
import express from "express";

const userRouter = express();

userRouter.post("/userRegistration", signin);

export default userRouter;

