import crypto from "crypto";
import { OTP_CONFIG } from "@/config/auth.config";

export const generateOTP = (): string => {
    const min = 10 ** (OTP_CONFIG.LENGTH - 1);
    const max = 10 ** OTP_CONFIG.LENGTH;

    return crypto.randomInt(min, max).toString();
};
