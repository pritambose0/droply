"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signinSchema, SigninUserDto } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Button from "@/components/Button";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

export function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, formState: { errors }, getValues, handleSubmit } = useForm<SigninUserDto>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  })

  const onSubmit = async (data: SigninUserDto) => {
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
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
        <p className="text-sm text-muted-foreground mb-6">
          We sent a password reset code to <strong className="text-foreground">{getValues("email")}</strong>.
          Enter it on the next page along with your new password.
        </p>
        <Link
          href="/reset-password"
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
            <KeyIcon />
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
          icon={<MailIcon />}
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          id="forgot-submit"
          disabled={isLoading}
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
