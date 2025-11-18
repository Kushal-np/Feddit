import { Response, Request } from "express";
import Retard from "../models/Retard";
import { AuthRequest } from "../types";
import type { IRetardResponse } from "../types/Retard/Retard";
import type { IRetard } from "../types/Retard/Retard";
import bcrypt from "bcryptjs"
import { UpdateRetardInput, updatePreferencesInput } from "../validators/Retard/RetardSchema";
import { LoginInput, RegisterInput, VerifyOtpInput } from "../validators/Retard/authSchema";
import { generateOtp } from "../utils/generateOtp";
import { emailTemplates } from "../utils/emailTemplates";
import { sendEmail } from "../utils/emailServices";
import { generateToken } from "../utils/generateToken";

const formatRetardResponse = (retard: IRetard): IRetardResponse => ({
    id: retard._id.toString(),
    retardname: retard.retardname,
    email: retard.email,
    displayName: retard.displayName,
    lie: retard.lie,
    avatarUrl: retard.avatarUrl,
    bannerUrl: retard.bannerUrl,
    drama: retard.drama,
    goonersCount: retard.goonersCount,
    gooningCount: retard.gooningCount,
    isVerified: retard.isVerified,
    createdAt: retard.createdAt,

})


export const registerUser = async (req: Request<{}, {}, RegisterInput>, res: Response): Promise<void> => {
    try {
        console.log("WEEEEEEEEEEEE AREEEEEEEEEEEE HEREEEEEEEEEEEEE")
        const { retardname, email, password, displayName } = req.body;
        console.log(retardname , email , password , displayName);
        const existingUser = await Retard.findOne({
            $or: [{ email }, { retardname }],
        });

        if (existingUser) {
            if (existingUser.email === email) {
                res.status(400).json({
                    success: false,
                    error: "Email already exists",
                })
                return;
            }
            if (existingUser.retardname === retardname) {
                res.status(400).json({
                    success: false,
                    error: "Retardname already exists"
                })
                return;
            }
        }

        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const retard = await Retard.create({
            email,
            retardname,
            passwordHash: password,
            displayName: displayName || retardname,
            otp,
            otpExpiry,
            isVerified: false,
        })

        try {
            const template = emailTemplates.verificationOtp(otp);
            await sendEmail({
                to: email,
                subject: template.subject,
                html: template.html
            });

            res.status(200).json({
                success: true,
                message: "Registration successfull , OTP sent successfully !!!",
                data: {
                    email: retard.email,
                    retardname: retard.retardname,
                },
            });


        }
        catch (emailError) {
            await Retard.findByIdAndDelete(retard._id);
            console.log("Email sending error", emailError);
            res.status(500).json({
                success: false,
                error: "Failed to send the verfication email. Please try again",
                message:(emailError as Error).message

            });
        }


    }
    catch (error) {
        console.log("Registration error", error);
        if ((error as any).code === 1100) {
            const field = Object.keys((error as any).keyPattern)[0];
            res.status(400).json({
                success: false,
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Registration failed. Please try again."
        });
    }
}

export const verifyOtp = async(req:Request<{} , {} , VerifyOtpInput> , res:Response):Promise<void> =>{
    try{
        
        const {email , otp} = req.body ; 
        console.log(email , otp)
        const retard: IRetard   = await Retard.findOne({email}).select("+otp +otpExpiry");
        if(!retard){
            res.status(400).json({
                success:false , 
                message:"User not found"
            })
            return ; 
        }
        if(retard?.isVerified){
            res.status(400).json({
                success:false , 
                message:"User is already verified"
            })
            return ;
        }
        if(!retard.otp || !retard.otpExpiry){
            res.status(400).json({
                success:false , 
                message:"No OTP found , please try again later" , 
            })
            return ; 
        }
        if(retard.otp != otp){
            res.status(400).json({
                success:false , 
                message:"The otp doesn't match , Invalid OTP"
            })
        }
        if(retard.otpExpiry < new Date()){
            res.status(400).json({
                success:false , 
                message:"OTP is expired",
            })
            return ; 
        }

        retard.isVerified = true ; 
        retard.otp = null ; 
        retard.otpExpiry = null ; 
        await retard.save();

        res.status(200).json({
            success:true , 
            message:"Email verified successfully ! You can now log in" , 
            data:{
                email: retard.email , 
                retardname : retard.retardname ,
                isVerified:true , 
            }
        });

    }
    catch(error){
        console.error("Verification error" , error);
        res.status(500).json({
            success:false , 
            error:"Verification failed , Please try again later"
        })
    }
};



export const loginUser = async (req: Request<{}, {}, LoginInput>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const retard: IRetard | null = await Retard.findOne({ email }).select("+passwordHash");

    if (!retard) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (!retard.passwordHash) {
      res.status(400).json({
        success: false,
        message: "This account uses OAuth login, you can't login from here",
      });
      return;
    }

    const ifPasswordIsMatched = await bcrypt.compare(password, retard.passwordHash);
    if (!ifPasswordIsMatched) {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }

    if (!retard.isVerified) {
      res.status(400).json({
        success: false,
        message: "Email not verified, please verify your email first",
        data: {
          requireVerifications: true,
          email: retard.email,
        },
      });
      return;
    }

    if (retard.isBanned) {
      res.status(400).json({
        success: false,
        message: "You are banned from this site",
        data: {
          isBanned: true,
          email: retard.email,
        },
      });
      return;
    }

    const token = generateToken(retard._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      retard: {
        id: retard._id,
        retardname: retard.retardname,
        email: retard.email,
        displayName: retard.displayName,
        avatarUrl: retard.avatarUrl,
        bannerUrl: retard.bannerUrl,
        drama: retard.drama,
        isVerified: retard.isVerified,
        preferences: retard.preferences,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};
