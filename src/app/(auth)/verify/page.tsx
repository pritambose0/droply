"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthAPI } from "@/lib/apiClient";
import OTPInput from "@/components/OTPInput";
import Button from "@/components/Button";
import { ApiError } from "@/lib/axios";
import { useResendTimer } from "@/hooks/useResendTimer";

function VerifyContent() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const { countdown, startCountdown, clearTimer } = useResendTimer({
        keyPrefix: "verify_expiry",
        identifier: email,
    });

    useEffect(() => {
        if (!email) {
            router.push("/sign-up");
        }
    }, [email, router]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;

        if (otp.length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            await AuthAPI.verify({ email, code: otp });
            clearTimer();
            router.push("/sign-in?message=Email verified successfully. Please sign in.");
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || "Invalid verification code");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) return setError("Email is required to resend code.");
        if (countdown > 0 || isResending) return;

        setIsResending(true);
        setError("");

        try {
            await AuthAPI.resendOTP({ email });
            startCountdown(60);
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
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center animate-float">
                        <ShieldCheck size={40} className="text-accent" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Verify your email</h1>
                <p className="text-sm text-muted-foreground">
                    We sent a 6-digit code to <span className="text-foreground font-medium">{email}</span>.
                    <br />
                    Enter it below to verify your account.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-fade-in">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <OTPInput
                    value={otp}
                    onChange={(val) => {
                        setOtp(val);
                        if (error) setError("");
                    }}
                />

                <Button
                    type="submit"
                    id="verify-submit"
                    isLoading={isLoading}
                    disabled={otp.length !== 6}
                    loadingText="Verifying..."
                >
                    Verify Email
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
                    {countdown > 0 ? (
                        <span className="text-accent font-medium">Resend in {countdown}s</span>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-accent hover:text-accent-hover transition-colors font-medium cursor-pointer"
                        >
                            {isResending ? "Sending..." : "Resend"}
                        </button>
                    )}
                </p>
            </div>

            <div className="mt-6 text-center">
                <Link
                    href="/sign-in"
                    id="verify-back-to-signin"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← Back to Sign In
                </Link>
            </div>
        </>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
                <p className="text-muted-foreground animate-pulse">Loading verification details...</p>
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
