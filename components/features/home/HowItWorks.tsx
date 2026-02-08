"use client";

import { Section } from "@/components/ui";
import { Icon } from "@iconify/react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Browse Institutions",
            desc: "Select your preferred country and university from our global database.",
            icon: "mdi:barcode-scan",
            bgColor: "bg-gray-50",
            iconColor: "text-yellow-500"
        },
        {
            title: "Choose Intake",
            desc: "Select the upcoming intake and course you want to apply for.",
            icon: "mdi:dots-grid",
            bgColor: "bg-gray-50",
            iconColor: "text-yellow-500"
        },
        {
            title: "Get Admitted",
            desc: "We handle the communication and admission work till you get your offer.",
            icon: "mdi:blogger",
            bgColor: "bg-gray-50",
            iconColor: "text-yellow-500"
        }
    ];

    return (
        <Section className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    How It Works
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Simple steps to get you admitted to your dream university
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto px-4">
                {/* Desktop View - Horizontal with Curved Arrows */}
                <div className="hidden md:flex items-center justify-center gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                            {/* Step Card */}
                            <div className="flex flex-col items-center group">
                                {/* Icon Container */}
                                <div className={`w-24 h-24 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon
                                        icon={step.icon}
                                        className={`${step.iconColor} text-5xl`}
                                    />
                                </div>

                                {/* Title and Description */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 text-center max-w-[200px] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Curved Dashed Arrow (SVG) */}
                            {idx < steps.length - 1 && (
                                <div className="relative mx-4">
                                    <svg
                                        width="120"
                                        height="80"
                                        viewBox="0 0 120 80"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="relative -top-8"
                                    >
                                        {/* Curved Dashed Path */}
                                        <path
                                            d="M 10 40 Q 60 10, 110 40"
                                            stroke="#D1D5DB"
                                            strokeWidth="2"
                                            strokeDasharray="8 8"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                        {/* Arrow Head */}
                                        <path
                                            d="M 110 40 L 105 35 M 110 40 L 105 45"
                                            stroke="#D1D5DB"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile View - Vertical Stack */}
                <div className="md:hidden space-y-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            {/* Icon Container */}
                            <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                <Icon
                                    icon={step.icon}
                                    className={`${step.iconColor} text-4xl`}
                                />
                            </div>

                            {/* Title and Description */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 text-center max-w-[280px] leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Vertical Arrow for Mobile */}
                            {idx < steps.length - 1 && (
                                <div className="my-6">
                                    <svg
                                        width="40"
                                        height="60"
                                        viewBox="0 0 40 60"
                                        fill="none"
                                    >
                                        <path
                                            d="M 20 5 L 20 55"
                                            stroke="#D1D5DB"
                                            strokeWidth="2"
                                            strokeDasharray="6 6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M 20 55 L 15 50 M 20 55 L 25 50"
                                            stroke="#D1D5DB"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
