"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SendCodeDto, sendCodeSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Mail, Key, CheckCircle2 } from "lucide-react";
import { AuthAPI } from "@/lib/apiClient";
import { ApiError } from "@/lib/axios";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { register, formState: { errors }, getValues, handleSubmit, setError } = useForm<SendCodeDto>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: SendCodeDto) => {
    setIsLoading(true);
    try {
      await AuthAPI.forgotPassword(data);
      setIsSent(true);
    } catch (err) {
      setIsSent(false);
      const apiError = err as ApiError;
      setError("email", { type: "server", message: apiError.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-success" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Check your email
        </h1>

        <p className="text-sm text-muted-foreground mb-4">
          If an account exists for{" "}
          <strong className="text-foreground">{getValues("email")}</strong>,
          we’ve sent a password reset code.
        </p>

        <p className="text-sm text-muted-foreground mb-6">
          Enter the code on the next screen to reset your password.
        </p>

        <Link
          href={`/reset-password?email=${encodeURIComponent(getValues("email"))}`}
          id="forgot-go-to-reset"
          className="block w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          Enter Reset Code
        </Link>
        <Link
          href="/sign-in"
          id="forgot-back-to-signin-success"
          className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center animate-float">
            <Key size={40} className="text-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Forgot password?</h1>
        <p className="text-sm text-muted-foreground">
          No worries. Enter your email and we&apos;ll send you a reset code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <Input
          id="forgot-email"
          type="email"
          required
          label="Email address"
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="flex justify-center w-full">
          <Button
            type="submit"
            id="forgot-submit"
            disabled={isLoading || !getValues("email")}
            isLoading={isLoading}
            loadingText="Sending..."
          >
            Send Reset Code
          </Button>
        </div>
      </form >

      <div className="mt-6 text-center">
        <Link
          href="/sign-in"
          id="forgot-back-to-signin"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </>
  );
}
