"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserDto, signupSchema } from "@/schemas/authSchema";
import { AuthAPI } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ApiError } from "@/lib/axios";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterUserDto>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "buyer" as "buyer" | "creator",
    }
  });

  const password = watch("password") || "";
  const role = watch("role");

  const passwordChecks = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /\d/.test(password) },
  ];

  const onSubmit = async (data: RegisterUserDto) => {
    setError("");
    setIsLoading(true);

    try {
      await AuthAPI.signup(data);
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Join Droply and start your digital journey
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Role Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            I want to
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="none"
              onClick={() => setValue("role", "buyer")}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${role === "buyer"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
            >
              Buy Products
            </Button>
            <Button
              type="button"
              variant="none"
              onClick={() => setValue("role", "creator")}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${role === "creator"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
            >
              Sell Products
            </Button>
          </div>
        </div>

        {/* Name */}
        <Input
          label="Full Name"
          id="signup-name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
          icon={<User size={18} />}
          required
        />

        {/* Email */}
        <Input
          label="Email"
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
          icon={<Mail size={18} />}
          required
        />

        {/* Password */}
        <div className="space-y-2">
          <Input
            label="Password"
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            icon={<Lock size={18} />}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Password strength indicators */}
          {password.length > 0 && (
            <div className="grid grid-cols-1 gap-2 pt-1 animate-fade-in">
              {passwordChecks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${check.valid ? "text-success" : "text-red-900"
                    }`}
                >
                  <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${check.valid ? "bg-success/20" : "bg-red-900"}`}>
                    {check.valid && <Check size={10} />}
                  </span>
                  {check.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          id="signup-submit"
          isLoading={isLoading}
          loadingText="Creating account..."
        >
          Sign Up as {role === "creator" ? "Creator" : "Buyer"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-card-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#121216] px-4 text-muted-foreground rounded-full">
            Already have an account?
          </span>
        </div>
      </div>

      <Link
        href="/sign-in"
        id="signup-go-to-signin"
        className="block w-full text-center py-3 rounded-xl glass text-foreground font-medium text-sm hover:bg-surface-hover transition-all"
      >
        Sign In
      </Link>
    </>
  );
}