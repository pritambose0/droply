import logger from "@/lib/logger";
import { Resend } from "resend";
import { ApiError } from "./ApiError";

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        logger.error({ err: "Resend API key is not defined" }, "Error sending email");
        throw new ApiError(500, "Resend API key is not defined");
    }

    if (!process.env.RESEND_FROM_EMAIL) {
        logger.error({ err: "Resend from email is not defined" }, "Error sending email");
        throw new ApiError(500, "Resend from email is not defined");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to,
            subject,
            html,
        });

        if (error) {
            logger.error({ err: error }, "Error sending email");
            throw new ApiError(500, "Failed to send email");
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        logger.error({ err: error }, "Error sending email");

        throw new ApiError(500, "Failed to send email");
    }
}
