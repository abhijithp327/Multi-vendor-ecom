import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const dbConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Mongo DB connected ✅'))
        .catch((error) => console.log("Mongo DB connection error ❌", error));
};
