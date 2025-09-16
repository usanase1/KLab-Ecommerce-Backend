"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_1 = __importDefault(require("express"));
const userRouter = (0, express_1.default)();
userRouter.post("/userRegistration", userController_1.signin);
exports.default = userRouter;
