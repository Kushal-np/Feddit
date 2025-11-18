import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IRetard } from "../types/Retard/Retard";



const retardSchema = new Schema<IRetard>(
    {
        retardname: {
            type: String,
            required: [true, "Your RetardName is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "Retardname must be at least 3 characters long"],
            maxlength: [30, "Retardname must not exceed 30 characters"],
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is Required !!!"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        passwordHash: {
            type: String,
            required: function (this: IRetard) {
                return !this.oauthProviders?.google;
            },
            select: false,
        },
        displayName: {
            type: String,
            default: "",
            maxlength: [50, "Display name must not exceed more than 50 characters"],
        },
        lie: {
            type: String,
            maxlength: [400, "lie must not exceed 400 characters"],
            default: "",
        },
        avatarUrl: {
            type: String,
            default: "https://default-avatar-url.png",
        },
        bannerUrl: {
            type: String,
            default: "",
        },
        drama: {
            rant: {
                type: Number,
                default: 0,
            },
            complain: {
                type: Number,
                default: 0,
            },
            total: {
                type: Number,
                default: 0
            },
        },
        goonersCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        gooningCount: {
            type: Number,
            default: 0,
            min: 0
        },
        gooners: [{
            type: Schema.Types.ObjectId, ref: "Retard"
        }],
        gooning: [{
            type: Schema.Types.ObjectId, ref: "Retard"
        }],
        joinedSubFeddits: [{
            type: Schema.Types.ObjectId, ref: "SubFeddit"
        }],
        GatekeepedSubFeddits: [{
            type: Schema.Types.ObjectId, ref: "SubFeddit"
        }],
        savedRants: [{
            type: Schema.Types.ObjectId, ref: "Rant"
        }],
        hypedRants: [{
            type: Schema.Types.ObjectId, ref: "Rant"
        }],
        trashedRants: [{
            type: Schema.Types.ObjectId, ref: "Rant"
        }],
        preferences: {
            nsfw: {
                type: Boolean,
                default: false,
            },
            darkMode: {
                type: Boolean,
                default: false,
            },
            emailNotifications: {
                type: Boolean,
                default: true,
            },
            showAdultContent: {
                type: Boolean,
                default: false,
            },
            language: {
                type: String,
                default: "en",
            },
        },
        refreshTokens: [{
            type: String,
        }],
        oauthProviders: {
            google: {
                id: String,
                email: String,
            },
            github: {
                id: String,
                email: String,
            },

        },
        isBanned: {
            type: Boolean,
            default: false,

        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp : {
            type: String,
            select: false,
            
        },
        otpExpiry: {
            type: Date,
            select: false,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//Compoun indexes for Retardname and email uniqueness
retardSchema.index({ retardname: 1, email: 1 });
retardSchema.index({ createdAt: -1 });
retardSchema.index({ "drama.total": -1 });

//Hash password even before saving

retardSchema.pre<IRetard>("save", async function (next) {
    if (!this.isModified("passwordHash") || !this.passwordHash) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        //Actually hashing the password
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        //calling the next funciton after this middleware if everythin goes well
        next();
    }
    catch (error) {
        //if some error occurs in the above process
        next(error as Error);
    }
})

//update the total Drama , (computed field)
retardSchema.pre<IRetard>("save", function (next) {
    // if the modified fieldis rant of the drama and also if complain is done then the total drama increases
    if (this.isModified("drama.rant") || this.isModified("drama.complain")) {
        this.drama.total = this.drama.rant + this.drama.complain;
    }
    next();
});

//matching the password actually entered by the retard , checking if it's correct within the db scope
retardSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    //return true as a promise if it worked
    return await bcrypt.compare(enteredPassword , this.passwordHash);
}

retardSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.passwordHash;
    delete obj.refreshTokens;
    delete obj.otp;
    delete obj.otpExpiry ; 
    delete obj.__v;
    return obj;
};

const Retard : Model<IRetard> = mongoose.model<IRetard>("Retard" , retardSchema); 
export default Retard;


