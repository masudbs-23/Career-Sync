"use client";

import { Icon } from "@iconify/react";
import { Section } from "@/components/ui";
import Image from "next/image";

export default function BackOfficeDetail() {
    return (
        <Section className="bg-black text-white rounded-[3rem] my-12 mx-4 md:mx-6 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="p-6 md:p-12">
                    <h2 className="text-4xl font-bold mb-6 text-white leading-tight">We Handle the Hard Work for You</h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                        Once you submit your application through our portal, it automatically lands in our specialized back-office system. Our expert team takes over to ensure your success.
                    </p>

                    <div className="space-y-6">
                        {[
                            { title: "Direct University Coordination", desc: "We communicate directly with admission officers to speed up your process." },
                            { title: "Document Verification", desc: "Our team reviews your documents to meet international standards." },
                            { title: "Real-time Tracking", desc: "Get updates on your application status directly in your dashboard." }
                        ].map((service, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                                    <Icon icon="solar:check-read-linear" className="text-black text-sm" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">{service.title}</h4>
                                    <p className="text-sm text-gray-500">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden lg:rounded-l-[3rem]">
                    <Image
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Back Office Team"
                        fill
                        className="object-cover opacity-60"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center max-w-xs">
                            <div className="text-3xl font-bold mb-2">24/7</div>
                            <p className="text-sm text-gray-300">Admission Processing Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
