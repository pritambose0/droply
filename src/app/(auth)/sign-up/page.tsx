"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Check, Loader2 } from "lucide-react";



export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer" as "buyer" | "creator",
  });
  const [error, setError] = useState("");

  const passwordChecks = [
    { label: "At least 6 characters", valid: formData.password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(formData.password) },
    { label: "One number", valid: /\d/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call — wire up to /api/auth/signup
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            I want to
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "buyer" })}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${formData.role === "buyer"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
            >
              Buy Products
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "creator" })}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${formData.role === "creator"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
            >
              Sell Products
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="signup-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <User size={18} />
            </span>
            <input
              id="signup-name"
              type="text"
              required
              minLength={3}
              maxLength={50}
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <Mail size={18} />
            </span>
            <input
              id="signup-email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <Lock size={18} />
            </span>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              maxLength={128}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3 rounded-xl bg-input-bg border border-input-border text-foreground placeholder-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password strength indicators */}
          {formData.password.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-1 animate-fade-in">
              {passwordChecks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${check.valid ? "text-success" : "text-muted"
                    }`}
                >
                  <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${check.valid ? "bg-success/20" : "bg-surface"}`}>
                    {check.valid && <Check size={10} />}
                  </span>
                  {check.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="signup-submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Creating account...
            </>
          ) : (
            `Sign Up as ${formData.role === "creator" ? "Creator" : "Buyer"}`
          )}
        </button>
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