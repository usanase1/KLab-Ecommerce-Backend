"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const productRouter = express_1.default.Router();
productRouter.post("/create", productController_1.createProduct);
productRouter.get("/", productController_1.getProducts);
productRouter.get("/", productController_1.getProductById);
productRouter.put("/:id", productController_1.updateProduct);
productRouter.delete("/:id", productController_1.deleteProduct);
exports.default = productRouter;
