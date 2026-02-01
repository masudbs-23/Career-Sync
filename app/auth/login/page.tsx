"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import { AuthService } from "@/lib/auth/actions";
import { loginSchema, type LoginFormData } from "@/lib/auth/schemas";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur", // Validate on blur for better UX
    });

    const onSubmit = async (data: LoginFormData) => {
        setError("");
        console.log("Login attempt with data:", data);
        
        try {
            console.log("Calling AuthService.login...");
            const response = await AuthService.login({
                email: data.email,
                password: data.password,
            });
            
            console.log("Login response:", response);

            // If we get a response with token and user, login is successful
            if (response.token && response.user) {
                console.log("Login successful, storing token and user");
                login(response.token, response.user);
                router.push("/");
            } else {
                console.log("Login failed: missing token or user");
                setError("Invalid email or password");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-white">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                <div className="max-w-md w-full space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
                            Welcome back
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Continue your global education journey.
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
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 border-2 border-gray-300 rounded checked:bg-black checked:border-black transition-all"
                                    disabled={isSubmitting}
                                />
                                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">Remember me</span>
                            </label>
                            <Link href="#" className="text-sm font-bold text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full py-5 text-lg font-bold"
                        >
                            Sign In
                        </Button>

                        <p className="text-center text-gray-500 text-sm">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="font-bold text-black border-b border-gray-300 hover:border-black transition-all">
                                Sign up for free
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block w-1/2 relative bg-gray-100">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2098&auto=format&fit=crop"
                    alt="Study Abroad"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                    <blockquote className="text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                        "The beautiful thing about learning is that no one can take it away from you."
                    </blockquote>
                    <cite className="text-xl opacity-90 not-italic font-medium">— B.B. King</cite>
                </div>
            </div>
        </div>
    );
}
