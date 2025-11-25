import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes"
import cookieParser from "cookie-parser";
import cors from "cors" ; 

const PORT = process.env.PORT!;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,             
}));
app.get("/home", (req, res) => {
    res.send("Hello world");
})
app.use('/auth', authRoutes)
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`),
        connectDB();

})