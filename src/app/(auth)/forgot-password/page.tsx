"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SendCodeDto, sendCodeSchema, signinSchema, SigninUserDto } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Mail, Key, CheckCircle2, Loader2 } from "lucide-react";



export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, formState: { errors }, getValues, handleSubmit } = useForm<SendCodeDto>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: SendCodeDto) => {
    setIsLoading(true);

    // Simulate API call — wire up to /api/auth/forgot-password
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-success" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
        <p className="text-sm text-muted-foreground mb-6">
          We sent a password reset code to <strong className="text-foreground">{getValues("email")}</strong>.
          Enter it on the next page along with your new password.
        </p>
        <Link
          href={`/reset-password?email=${getValues("email")}`}
          id="forgot-go-to-reset"
          className="block w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          Enter Reset Code
        </Link>
        <Link
          href="/sign-in"
          id="forgot-back-to-signin"
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <Button
          type="submit"
          id="forgot-submit"
          isLoading={isLoading}
          loadingText="Sending..."
        >
          Send Reset Code
        </Button>
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
