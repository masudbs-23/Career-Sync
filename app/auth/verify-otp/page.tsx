"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import { AuthService } from "@/lib/auth/actions";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        const storedEmail = localStorage.getItem("otp_email");
        if (!storedEmail) {
            router.push("/auth/signup");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length < 4) {
            setError("Please enter the full 4-digit code.");
            return;
        }

        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await AuthService.verifyOtp({
                email,
                otp: otpString,
            });

            if (response.token) {
                login(response.token, response.user);
                localStorage.removeItem("otp_email");
                router.push("/");
            } else {
                setError("Verification failed. Please try again.");
            }
        } catch (err: any) {
            const errorMessage = err.data?.message || err.message || "Verification failed.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await AuthService.resendOtp({ email });
            setMessage(response.message || "OTP resent successfully.");
        } catch (err: any) {
            const errorMessage = err.data?.message || err.message || "Failed to resend OTP.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 flex w-full min-h-screen bg-white">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                <div className="max-w-md w-full space-y-10">
                    <div className="space-y-6">
                        <Link href="/auth/signup" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-all group">
                            <Icon icon="solar:alt-arrow-left-linear" className="text-lg transition-transform group-hover:-translate-x-1" />
                            Back to registration
                        </Link>

                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
                                Verify Email
                            </h2>
                            <p className="text-gray-500 text-lg">
                                We've sent a 4-digit code to <span className="text-black font-semibold">{email}</span>.
                            </p>
                        </div>
                    </div>

                    <form className="space-y-10" onSubmit={handleVerify}>
                        <div className="flex justify-between gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-16 h-20 text-center text-3xl font-bold border-b-4 border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent"
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-900 text-sm font-medium">
                                {message}
                            </div>
                        )}

                        <div className="space-y-6">
                            <Button
                                type="submit"
                                loading={isLoading}
                                disabled={isLoading || otp.some(d => !d)}
                                className="w-full py-5 text-lg font-bold"
                            >
                                Verify Now
                            </Button>

                            <div className="text-center">
                                <p className="text-gray-500 text-sm">
                                    Didn't receive the code?{" "}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={isLoading}
                                        className="font-bold text-black border-b border-gray-300 hover:border-black transition-all disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block w-1/2 relative bg-gray-100">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop"
                    alt="University Campus"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                    <blockquote className="text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                        "The roots of education are bitter, but the fruit is sweet."
                    </blockquote>
                    <cite className="text-xl opacity-90 not-italic font-medium">— Aristotle</cite>
                </div>
            </div>
        </main>
    );
}
