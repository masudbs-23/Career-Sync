"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

interface BackButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

const BackButton = ({ href = "/", label = "Back", className = "" }: BackButtonProps) => {
    return (
        <div className={`w-full mb-6 ${className}`}>
            <Link
                href={href}
                className="inline-flex items-center gap-2 text-black hover:text-black transition-colors group px-4 py-2"
            >
                <Icon
                    icon="solar:alt-arrow-left-linear"
                    className="text-xl group-hover:-translate-x-1 transition-transform"
                />
                <span className="font-medium">{label}</span>
            </Link>
        </div>
    );
};

export default BackButton;
