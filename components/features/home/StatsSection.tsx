"use client";

import { Icon } from "@iconify/react";
import { Section } from "@/components/ui";

export default function StatsSection() {
    return (
        <Section className="bg-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Our Global Reach</h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                    Helping students across the globe reach their dream universities with expert guidance and seamless application support.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    { title: "Partner Universities", value: "800+", desc: "Top-tier institutions worldwide", icon: "solar:backpack-linear" },
                    { title: "Success Rate", value: "99%", desc: "Admission and visa approval", icon: "solar:verified-check-linear" },
                    { title: "Career Path", value: "15k+", desc: "Successful career journeys", icon: "solar:users-group-rounded-linear" }
                ].map((item, idx) => (
                    <div key={idx} className="p-10 bg-gray-50 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:bg-white group">
                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 text-3xl text-black shadow-sm group-hover:scale-110 transition-transform">
                            <Icon icon={item.icon} />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                        <div className="text-4xl font-extrabold text-black mb-2">{item.value}</div>
                        <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
