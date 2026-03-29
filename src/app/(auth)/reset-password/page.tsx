"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ResetPasswordDto, resetPasswordSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, Mail, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import OTPInput from "@/components/OTPInput";
import { AuthAPI } from "@/lib/apiClient";
import { ApiError } from "@/lib/axios";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const otpValue = watch("code") || "";

  const onSubmit = async (data: ResetPasswordDto) => {
    setError("");
    setIsLoading(true);

    try {
      await AuthAPI.resetPassword(data);
      localStorage.removeItem(`reset_password_expiry:${email}`);
      setIsSuccess(true);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.message?.toLowerCase().includes("otp")) {
        setError("Invalid or expired reset code");
      } else {
        setError(apiError.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = (seconds: number) => {
    if (!email) return;
    const expiry = Date.now() + seconds * 1000;
    localStorage.setItem(`reset_password_expiry:${email}`, expiry.toString());
    setCountdown(seconds);
  };

  const handleResendCode = async () => {
    if (!email) return setError("Email is required to resend code.");
    if (countdown > 0 || isResendLoading) return;

    setError("");
    setIsResendLoading(true);

    try {
      await AuthAPI.resendOTP({ email });
      startCountdown(60);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setIsResendLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      setValue("email", email, { shouldValidate: true });
    }
  }, [email, setValue]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (!email) return;

    const storedExpiry = localStorage.getItem(`reset_password_expiry:${email}`);
    if (storedExpiry) {
      const remainingTime = Math.round((parseInt(storedExpiry) - Date.now()) / 1000);
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      } else {
        localStorage.removeItem(`reset_password_expiry:${email}`);
      }
    }
  }, [email]);

  if (isSuccess) {
    return (
      <div className="text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-success" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Password reset!</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        <Link
          href="/sign-in"
          id="reset-go-to-signin"
          className="block w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center animate-float">
            <RefreshCw size={40} className="text-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter the code from your email and choose a new password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            readOnly
            icon={<Mail size={18} />}
            error={errors.email?.message}
            required
          />
        </div>

        {/* OTP Code */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Reset Code
          </label>
          <OTPInput
            value={otpValue}
            onChange={(value) => setValue("code", value, { shouldValidate: true })}
            error={errors.code?.message}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the code?{" "}
            {countdown > 0 ? (
              <span className="text-accent font-medium">Resend in {countdown}s</span>
            ) : (
              <button
                type="button"
                id="reset-resend-btn"
                onClick={handleResendCode}
                disabled={isResendLoading}
                className="text-accent hover:underline font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResendLoading ? (
                  <span className="flex items-center gap-1.5 justify-center">
                    <Loader2 size={14} className="animate-spin" /> Resending...
                  </span>
                ) : (
                  "Resend code"
                )}
              </button>
            )}
          </p>
        </div>


        {/* New Password */}
        <div className="space-y-2">
          <Input
            label="New Password"
            id="reset-password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            icon={<Lock size={18} />}
          />
        </div>


        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          id="reset-confirm"
          type={showConfirmPassword ? "text" : "password"}
          required
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <Button
          type="submit"
          id="reset-submit"
          disabled={isLoading}
          loadingText="Resetting"
          isLoading={isLoading}
          className="w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Reset Password
        </Button>
      </form >

      <div className="mt-6 text-center">
        <Link
          href="/sign-in"
          id="reset-back-to-signin"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </>
  );
}
