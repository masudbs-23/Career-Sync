"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">Why Choose Our Consultancy?</h2>
                        <p className="text-lg text-gray-500 mb-12 leading-relaxed">
                            We provide end-to-end support for your study abroad journey, ensuring a seamless transition to your new life as an international student.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                            {[
                                { title: "Free Counseling", desc: "One-on-one sessions to understand your goals and find the perfect course.", icon: "solar:chat-line-linear" },
                                { title: "Test Preparation", desc: "Expert coaching for IELTS, TOEFL, GRE, and GMAT to score your best.", icon: "solar:pen-new-square-linear" },
                                { title: "Visa Processing", desc: "Comprehensive documentation support and mock interviews for visa success.", icon: "solar:diploma-verified-linear" },
                                { title: "Travel & Stay", desc: "Assistance with flight bookings and finding safe student accommodation.", icon: "solar:cloning-linear" },
                                { title: "Course Selection", desc: "Filtering thousands of courses based on your budget and career goals.", icon: "solar:ranking-linear" },
                                { title: "Post-Arrival Support", desc: "Help with local registration and part-time job guidance abroad.", icon: "solar:map-point-linear" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-black group-hover:bg-black group-hover:text-white transition-colors">
                                        <Icon icon={item.icon} className="text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black mb-1 transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1523050853051-be991f85a6ad?q=80&w=2070&auto=format&fit=crop"
                            alt="Student Life"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                            <div className="text-white">
                                <div className="text-6xl font-bold mb-2">100%</div>
                                <div className="text-2xl font-medium opacity-90">Personalized Guidance For Every Student</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
