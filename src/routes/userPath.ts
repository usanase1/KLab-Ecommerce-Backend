import { signin, login, getAllUsers, logout } from "../controllers/userController";
import express from "express";

const userRouter = express();

userRouter.post("/userRegistration", signin);
userRouter.post("/userLogin",login)
userRouter.get("/getAllUsers",getAllUsers)
userRouter.post("/userLogout", logout)

export default userRouter;

