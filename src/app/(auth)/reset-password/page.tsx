"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ResetPasswordDto, resetPasswordSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, Mail, RefreshCw, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import OTPInput from "@/components/OTPInput";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
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

    // Simulate — wire up to /api/auth/reset-password
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

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

  useEffect(() => {
    if (email) {
      setValue("email", email, { shouldValidate: true });
    }
  }, [email, setValue]);

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
            icon={<Mail size={18} />}
            error={errors.email?.message}
            required
          />
        </div>

        {/* OTP Code */}
        <OTPInput
          value={otpValue}
          onChange={(value) => setValue("code", value, { shouldValidate: true })}
          error={errors.code?.message}
        />

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
        <div className="space-y-2">
          <Input
            label="Confirm Password"
            id="reset-confirm"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            {...register("confirmPassword")}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

        </div>

        {errors.confirmPassword && (
          <p className="text-xs text-danger animate-fade-in">{errors.confirmPassword.message}</p>
        )}

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
