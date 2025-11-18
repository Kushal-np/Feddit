import express , {Router} from "express"
import { validateRequest } from "../middlewares/validateRequest"
import { registerSchema, verifyOtpSchema } from "../validators/Retard/authSchema";
import { loginUser, registerUser, verifyOtp } from "../controllers/RetardController";
import { AnyZodObject } from "zod/v3";
const router = express.Router();

router.post("/register", validateRequest(registerSchema as unknown as AnyZodObject), registerUser);
router.post("/verify-otp" , validateRequest(verifyOtpSchema as unknown as AnyZodObject) , verifyOtp);
router.post("/login" ,validateRequest(verifyOtpSchema as unknown as AnyZodObject) ,loginUser  );


export default router ; 