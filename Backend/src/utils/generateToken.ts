import jwt from "jsonwebtoken";

export const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT secret key is not defined in environment variables");
    }

    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
        return token;
    } catch (error) {
        console.error("JWT generation error:", (error as Error).message);
        throw error;
    }
};
