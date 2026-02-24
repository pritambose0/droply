import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import logger from "@/lib/logger";
import connectDB from "@/lib/connectDB";

export async function handleRequest(
    fn: () => Promise<Response>
) {
    try {
        await connectDB();
        return await fn();
    } catch (error: unknown) {
        // If it's a custom error
        if (error instanceof ApiError) {
            logger.warn({ statusCode: error.statusCode, message: error.message }, "Operational error");
            return NextResponse.json(
                error.toJSON(),
                { status: error.statusCode }
            );
        }

        // Unexpected error
        logger.error({ err: error }, "Unexpected error");

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}