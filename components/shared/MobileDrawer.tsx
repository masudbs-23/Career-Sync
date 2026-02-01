"use client";

import { NAVIGATION } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const { user, isAuthenticated } = useAuth();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-black">Menu</h2>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        onClick={onClose}
                    >
                        <Icon icon="solar:close-circle-linear" className="text-2xl text-black" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6">
                    <div className="space-y-6">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-4 text-lg font-medium text-black hover:text-gray-600 transition-colors p-3 rounded-lg hover:bg-gray-50"
                                onClick={onClose}
                            >
                                <Icon icon={item.icon} className="text-xl" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Login Section */}
                <div className="p-6 border-t border-gray-100">
                    {isAuthenticated && user ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {user.avatar?.url ? (
                                        <Image
                                            src={user.avatar.url}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                            sizes="40px"
                                        />
                                    ) : (
                                        <Icon icon="solar:user-circle-linear" className="text-2xl text-black" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-black">{user.name}</p>
                                    <p className="text-sm text-gray-500">Profile</p>
                                </div>
                            </div>
                            <Link
                                href="/profile"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                                onClick={onClose}
                            >
                                <Icon icon="solar:user-linear" className="text-xl" />
                                View Profile
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white font-medium  hover:bg-gray-700 transition-colors"
                            onClick={onClose}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
