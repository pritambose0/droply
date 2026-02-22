import z from "zod";

const otpCode = z.string()
    .length(6, "Code must be 6 digits")
    .trim()
    .regex(/^[0-9]{6}$/, "Code must be 6 digits");

export const signupSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long")
        .trim(),
    email: z.email("Invalid email address").toLowerCase().trim(),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password must be at most 128 characters long"),
    role: z.enum(["creator", "buyer"])
        .optional()
        .default("buyer"),
})

export const signinSchema = z.object({
    email: z.email("Invalid email address")
        .toLowerCase()
        .trim(),
    password: z.string()
        .min(1, "Password is required")
})

export const verifyCodeSchema = z.object({
    code: otpCode,
})

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address")
        .toLowerCase()
        .trim(),
})

export const resetPasswordSchema = z.object({
    code: otpCode,
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password must be at most 128 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
