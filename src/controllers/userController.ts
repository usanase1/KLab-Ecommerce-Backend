import {User} from "../models/userModel";
import {NextFunction, Request, Response} from 'express';
import { generateAccessToken } from "../utils/tokenGeneration";
import bcryptjs from 'bcryptjs';

export const signin = async (req: Request ,  res: Response, next: NextFunction) =>
{
    try{
        const {email, password, fullname, userRole} =  req.body;

        const existingUser = await User.findOne({email});

        if (existingUser){
            return   res.status(400).json({message: "user already exists"});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser =  new User ({fullname, email, password:hashedPassword, userRole});
        const token = generateAccessToken(newUser);
        newUser.accessToken = token;
        await newUser.save();
        return res.status(201).json({message: "User created successfully", newUser})

    }
    catch(error){
        return res.status(500).json({message: "Server error"})
    }
}

export const login=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const{email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(!existingUser){
      return res.status(400).json({message:"User not found,please register"});
    }         
    const isPasswordMatched=await bcryptjs.compare(password,existingUser.password);
    if(!isPasswordMatched){
      return res.status(400).json({message:"Invalid credentials"});
    }               
    const token=generateAccessToken(existingUser);
    existingUser.accessToken=token;
    await existingUser.save();
    return res.status(200).json({message:"User logged in successfully",existingUser});  

  }
  catch(error){
    return res.status(400).json({message:"Error in user login",error});
  }
}

export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const users=await User.find();
    return res.status(200).json({message:"Users fetched successfully",users});
  }catch(error){
    return res.status(400).json({message:"Error in fetching users",error});
  } }

  export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split("")[1];
        if (!token) {
            return res.status(400).json({message: "No token provided"});
        }

        const user = await User.findOne({accessToken: token});
        if(!user){
            return res.status(400).json({message : "Invalid token or user not found"});
        }
        user.accessToken = "";
        await user.save();

        return res.status(200).json({message: "User logged out successfully"});
    }
    catch(error){
        return res.status(500).json({message: "Error in logout", error})
    }
  }