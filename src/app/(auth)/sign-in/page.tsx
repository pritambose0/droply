"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninUserDto, signinSchema } from "@/schemas/authSchema";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { AuthAPI } from "@/lib/apiClient";
import { ApiError } from "@/lib/axios";

function SignInContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyOptions, setShowVerifyOptions] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("message");

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<SigninUserDto>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: SigninUserDto) => {
    setError("");
    setResendSuccess("");
    setShowVerifyOptions(false);
    router.replace("/sign-in");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else if (result.error === "UNVERIFIED_EMAIL") {
          setError("Please verify your email before signing in.");
          setShowVerifyOptions(true);
        } else {
          setError(result.error);
        }
        console.log(result.error);
      } else {
        const session = await getSession();
        if (session?.user?.role === "creator") {
          router.push("/seller/dashboard");
        } else {
          router.push("/buyer/library");
        }
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    if (!email) return;

    setIsResending(true);
    setResendSuccess("");
    setError("");

    try {
      await AuthAPI.resendOTP({ email });
      setResendSuccess("Verification code sent to " + email);
      router.replace("/verify?email=" + encodeURIComponent(email));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-3 rounded-xl bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} />
          {successMessage}
        </div>
      )}

      {resendSuccess && (
        <div className="mb-6 p-3 rounded-xl bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2 animate-fade-in justify-center">
          <CheckCircle2 size={16} />
          {resendSuccess}
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-fade-in">
          <p>{error}</p>
          {showVerifyOptions && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href={`/verify?email=${encodeURIComponent(getValues("email"))}`}
                className="px-4 py-2 rounded-lg bg-danger text-white text-xs font-semibold hover:bg-danger/90 transition-colors"
                id="signin-verify-btn"
              >
                Verify Now
              </Link>
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isResending}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors disabled:opacity-50"
                id="signin-resend-btn"
              >
                {isResending ? "Sending..." : "Resend Email"}
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          id="signin-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
          icon={<Mail size={18} />}
          required
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Password {<span className="text-red-500">*</span>}
            </span>
            <Link
              href="/forgot-password"
              id="signin-forgot-password"
              className="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            icon={<Lock size={18} />}
            required
            rightIcon={
              <Button
                type="button"
                variant="none"
                onClick={() => setShowPassword(!showPassword)}
                className="p-0 m-0 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            }
          />
        </div>

        <Button
          type="submit"
          id="signin-submit"
          className="w-full"
          isLoading={isLoading}
          loadingText="Signing in..."
        >
          Sign In
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-card-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#121216] px-4 text-muted-foreground rounded-full">
            New to Droply?
          </span>
        </div>
      </div>

      <Link
        href="/sign-up"
        id="signin-go-to-signup"
        className="block w-full text-center py-3 rounded-xl glass text-foreground font-medium text-sm hover:bg-surface-hover transition-all"
      >
        Create an account
      </Link>
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}