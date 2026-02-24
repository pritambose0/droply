import { ApiError } from "@/helpers/ApiError";
import { RegisterUserDto, ResetPasswordDto, resetPasswordSchema, SendCodeDto, sendCodeSchema, signupSchema, VerifyCodeDto, verifyCodeSchema } from "../schemas/authSchema";
import { validate } from "@/helpers/validate";
import UserModel from "@/models/User";
import { generateOTP } from "@/helpers/generateOTP";
import { sendEmail } from "@/helpers/sendEmail";
import VerificationEmail from "../../emails/verificationEmail";
import { render } from "@react-email/components";
import { OTP_CONFIG } from "@/config/auth.config";

export class AuthService {
    static async registerUser(data: RegisterUserDto) {
        const { name, email, password, role } = validate(signupSchema, data);

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        const otp = generateOTP();

        const user = await UserModel.create(
            {
                name,
                email,
                password,
                role,
                verificationCode: otp,
                verificationCodeExpiry: new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000),
                verificationCodeAttempts: 0
            });

        const html = await render(VerificationEmail({ otp, expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES }));

        await sendEmail({ to: email, subject: "Verify your email | Droply", html });

        return user;
    }

    static async verifyCode(data: VerifyCodeDto) {
        const { email, code } = validate(verifyCodeSchema, data);

        const user = await UserModel.findOne({ email }).select("+verificationCode +verificationCodeExpiry +verificationCodeAttempts");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.isVerified) {
            throw new ApiError(400, "User already verified");
        }

        if (!user.verificationCode) {
            throw new ApiError(400, "No verification code found");
        }

        if (user.verificationCodeAttempts >= OTP_CONFIG.MAX_ATTEMPTS) {
            throw new ApiError(429, "Too many attempts");
        }

        const isValidOTP = await user.compareVerificationCode(code);
        if (!isValidOTP) {
            user.verificationCodeAttempts++;
            await user.save();
            throw new ApiError(400, "Invalid OTP");
        }

        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpiry = null;
        user.verificationCodeAttempts = 0;
        await user.save();

        return user;
    }

    static async resendOTP(data: SendCodeDto) {
        const { email } = validate(sendCodeSchema, data);

        const user = await UserModel.findOne({ email }).select("+verificationCode +verificationCodeExpiry +verificationCodeAttempts");

        if (!user || user.isVerified) return;

        const otp = generateOTP();
        user.verificationCode = otp;
        user.verificationCodeExpiry = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
        user.verificationCodeAttempts = 0;

        await user.save();

        const html = await render(VerificationEmail({
            otp,
            expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES
        }));

        await sendEmail({ to: email, subject: "Resend OTP | Droply", html });

        return user;
    }

    static async forgotPassword(data: SendCodeDto) {
        const { email } = validate(sendCodeSchema, data);

        const user = await UserModel.findOne({ email }).select("+verificationCode +verificationCodeExpiry +verificationCodeAttempts");

        if (!user || !user.isVerified) return

        const otp = generateOTP();
        user.verificationCode = otp;
        user.verificationCodeExpiry = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
        user.verificationCodeAttempts = 0;

        await user.save();

        const html = await render(VerificationEmail({
            otp,
            expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES
        }));

        await sendEmail({ to: email, subject: "Reset Password | Droply", html });

        return user;
    }

    static async resetPassword(data: ResetPasswordDto) {
        const { email, code, password } = validate(resetPasswordSchema, data);

        const user = await UserModel.findOne({ email }).select("+verificationCode +verificationCodeExpiry +verificationCodeAttempts");

        if (!user || !user.isVerified) return

        if (!user.verificationCode) {
            throw new ApiError(400, "No verification code found");
        }

        if (user.verificationCodeAttempts >= OTP_CONFIG.MAX_ATTEMPTS) {
            throw new ApiError(429, "Too many attempts");
        }

        const isValidOTP = await user.compareVerificationCode(code);
        if (!isValidOTP) {
            user.verificationCodeAttempts++;
            await user.save();
            throw new ApiError(400, "Invalid OTP");
        }

        user.password = password;
        user.verificationCode = null;
        user.verificationCodeExpiry = null;
        user.verificationCodeAttempts = 0;
        await user.save();

        return user;
    }
}