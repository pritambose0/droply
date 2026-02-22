import mongoose from "mongoose";
import { DB_NAME } from "../constants/dbName";

async function connectDB(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to database");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        })

        console.log(`Connected to database ${db.connection.host}`);

    } catch (error) {
        console.error("Database connection failed", error);
        throw new Error("Database connection failed");
    }

}

export default connectDB;
