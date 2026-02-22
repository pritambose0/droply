import mongoose from "mongoose";
import { DB_NAME } from "../constants/dbName";
import logger from "./logger";

async function connectDB(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        logger.debug("Already connected to database");
        return;
    }

    if (!process.env.MONGODB_URI) {
        logger.error("MONGODB_URI is not defined in environment variables");
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        })

        logger.info({ host: db.connection.host, dbName: DB_NAME }, "Database connected");

    } catch (error) {
        logger.error({ error }, "Database connection failed");
        throw new Error("Database connection failed");
    }

}

export default connectDB;
