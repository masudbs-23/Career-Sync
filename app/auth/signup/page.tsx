"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import { AuthService } from "@/lib/auth/actions";
import { signupSchema, type SignupFormData } from "@/lib/auth/schemas";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: SignupFormData) => {
        setError("");
        try {
            const response = await AuthService.signup({
                email: data.email,
                password: data.password,
            });

            if (response.message === "Registration successful. Please check your email for verification code.") {
                localStorage.setItem("otp_email", data.email);
                router.push("/auth/verify-otp");
            } else {
                setError(response.message || "Signup failed. Please try again.");
            }
        } catch (err: any) {
            const errorMessage = err.data?.message || err.message || "Signup failed. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <main className="flex-1 flex w-full min-h-screen">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
                <div className="max-w-md w-full space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
                            Start your journey
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Create an account to explore global education opportunities.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.email
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="name@example.com"
                                        disabled={isSubmitting}
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.password
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="••••••••"
                                        disabled={isSubmitting}
                                        {...register("password")}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.confirmPassword
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="••••••••"
                                        disabled={isSubmitting}
                                        {...register("confirmPassword")}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full py-5 text-lg font-bold"
                        >
                            Create Account
                        </Button>

                        <p className="text-center text-gray-500 text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-bold text-black border-b border-gray-300 hover:border-black transition-all">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block w-1/2 relative bg-gray-100">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1523050853051-be991f85a6ad?q=80&w=2070&auto=format&fit=crop"
                    alt="Abroad Education"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                    <blockquote className="text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                    </blockquote>
                    <cite className="text-xl opacity-90 not-italic font-medium">— Malcolm X</cite>
                </div>
            </div>
        </main>
    );
}
