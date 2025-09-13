import express from "express";
import {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import mainRouter from "./routes/indexRouting";
import bodyParser from "body-parser";
import { connectDB } from "./config/databaseConfiguration";
dotenv.config();




const app = express();

const port = process.env.PORT || 4000;
//const db_user = process.env.DB_USER;
//const db_pass = process.env.DB_PASS;

//app.get("/" , (req: Request , res: Response) =>{
   // res.send("Initial node js project")
//});
app.use(express.json());




connectDB();
app.use('/api-v1', mainRouter);

app.listen(port , () => {
    console.log(`server is running:http://localhost:${port} `)
})