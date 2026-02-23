import logger from "@/lib/logger";
import sgMail from "@sendgrid/mail";
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
    if (!process.env.SENDGRID_API_KEY) {
        logger.error({ err: "SendGrid API key is not defined" }, "Error sending email");
        throw new ApiError(500, "SendGrid API key is not defined");
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
        logger.error({ err: "SendGrid from email is not defined" }, "Error sending email");
        throw new ApiError(500, "SendGrid from email is not defined");
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        await sgMail.send({
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            html,
        });
    } catch (error) {
        logger.error({ err: error }, "Error sending email");

        throw new ApiError(500, "Failed to send email");
    }
}