"use client";

import { Icon } from "@iconify/react";
import { Section } from "@/components/ui";

export default function HowItWorks() {
    return (
        <Section className="bg-white">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-black mb-4">How Your Journey Begins</h2>
                <p className="text-gray-500 font-medium">Clear steps to get you admitted to your dream university</p>
            </div>

            <div className="relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden lg:block absolute top-[120px] left-1/2 -translate-x-1/2 w-[80%] h-0.5 border-t-2 border-dashed border-gray-200 -z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {[
                        { step: "01", title: "Browse Institutions", desc: "Select your preferred country and university from our global database.", icon: "solar:global-linear" },
                        { step: "02", title: "Choose Intake", desc: "Select the upcoming intake and course you want to apply for.", icon: "solar:calendar-mark-linear" },
                        { step: "03", title: "Submit & Sit Back", desc: "Our back-office team receives your application and starts the processing.", icon: "solar:upload-square-linear" },
                        { step: "04", title: "Get Admitted", desc: "We handle the communication and admission work till you get your offer.", icon: "solar:diploma-linear" }
                    ].map((item, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-black text-white rounded-3xl flex items-center justify-center mb-8 text-3xl font-bold shadow-xl group-hover:-translate-y-2 transition-transform">
                                <Icon icon={item.icon} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-black font-bold text-xs mb-4">STEP {item.step}</div>
                            <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
