import dotenv from "dotenv" ; 
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes"
import cookieParser from "cookie-parser";
const PORT = process.env.PORT! ; 
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/home" , (req , res)=>{
    res.send("Hello world");
})
app.use('/auth' , authRoutes)
app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`) , 
    connectDB();

})