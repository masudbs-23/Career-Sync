"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Button from "../Button";

import { NAVIGATION } from "@/constants";

export default function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold text-black tracking-tight">
                        Career Sync
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {NAVIGATION.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-black font-medium hover:text-gray-600 transition-colors text-sm uppercase tracking-wide"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3 pl-4 ml-2">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer group"
                            >
                                <div className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                                    {user.avatar?.url ? (
                                        <Image
                                            src={user.avatar.url}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                            sizes="32px"
                                        />
                                    ) : (
                                        <Icon icon="solar:user-circle-linear" className="text-xl text-black" />
                                    )}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Button>Login</Button>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon icon={isMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-2xl text-black" />
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white p-6 absolute w-full shadow-none h-screen z-50">
                    <nav className="flex flex-col gap-6">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-xl font-bold text-black border-b border-gray-100 pb-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
