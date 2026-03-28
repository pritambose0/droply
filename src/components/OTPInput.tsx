"use client";

import { useEffect, useRef, useState } from "react";
import Input from "./Input";

interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    error?: string;
}

export default function OTPInput({ value, onChange, length = 6, error }: OTPInputProps) {
    const [digits, setDigits] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const newDigits = value.split("").slice(0, length);
        const paddedDigits = [...newDigits, ...new Array(length - newDigits.length).fill("")];
        setDigits(paddedDigits);
    }, [value, length]);

    const handleChange = (index: number, val: string) => {
        if (!/^[0-9]?$/.test(val)) return;

        const newDigits = [...digits];
        newDigits[index] = val;
        const newValue = newDigits.join("");
        onChange(newValue);

        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
        onChange(pasted);
        inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {digits.map((digit, i) => (
                    <Input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`w-11 h-12 text-center text-lg font-bold rounded-xl bg-input-bg border text-foreground focus:outline-none focus:ring-2 focus:ring-input-focus transition-all ${digit ? "border-accent/40" : "border-input-border"
                            }`}
                    />
                ))}
            </div>
            {error && <p className="text-center text-xs text-danger animate-fade-in">{error}</p>}
        </div>
    );
}
