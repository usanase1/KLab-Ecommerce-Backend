"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getAllUsers = exports.login = exports.signin = void 0;
const userModel_1 = require("../models/userModel");
const tokenGeneration_1 = require("../utils/tokenGeneration");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, fullname, userRole } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.User({ fullname, email, password: hashedPassword, userRole });
        const token = (0, tokenGeneration_1.generateAccessToken)(newUser);
        newUser.accessToken = token;
        yield newUser.save();
        return res.status(201).json({ message: "User created successfully", newUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.signin = signin;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found,please register" });
        }
        const isPasswordMatched = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = (0, tokenGeneration_1.generateAccessToken)(existingUser);
        existingUser.accessToken = token;
        yield existingUser.save();
        return res.status(200).json({ message: "User logged in successfully", existingUser });
    }
    catch (error) {
        return res.status(400).json({ message: "Error in user login", error });
    }
});
exports.login = login;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        return res.status(200).json({ message: "Users fetched successfully", users });
    }
    catch (error) {
        return res.status(400).json({ message: "Error in fetching users", error });
    }
});
exports.getAllUsers = getAllUsers;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("")[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        const user = yield userModel_1.User.findOne({ accessToken: token });
        if (!user) {
            return res.status(400).json({ message: "Invalid token or user not found" });
        }
        user.accessToken = "";
        yield user.save();
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error in logout", error });
    }
});
exports.logout = logout;
