import { RegisterUserDto, VerifyCodeDto, SendCodeDto, ResetPasswordDto } from "@/schemas/authSchema";
import { axiosInstance, APIResponse } from "./axios";

export const AuthAPI = {
    signup: (data: RegisterUserDto): Promise<APIResponse> => axiosInstance.post("/auth/signup", data),
    verify: (data: VerifyCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/verify", data),
    resendOTP: (data: SendCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/resend-otp", data),
    forgotPassword: (data: SendCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/forgot-password", data),
    resetPassword: (data: ResetPasswordDto): Promise<APIResponse> => axiosInstance.post("/auth/reset-password", data),
};
