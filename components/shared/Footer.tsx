"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-16 border-t border-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Education Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:globus-linear" className="text-white" />
                            Academic Services
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Browse Universities", href: "/universities" },
                                { name: "Degree Courses", href: "/courses" },
                                { name: "Admission Support", href: "#" },
                                { name: "Visa Assistance", href: "#" },
                                { name: "Scholarships", href: "#" },
                                { name: "IELTS & Test Prep", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="hover:text-white transition-colors text-sm font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:map-point-linear" className="text-white" />
                            Top Destinations
                        </h3>
                        <ul className="space-y-4">
                            {["United Kingdom", "United States", "Canada", "Australia", "Germany", "Malaysia"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-white transition-colors text-sm font-medium">
                                        Study in {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Head Office */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:chat-line-linear" className="text-white" />
                            Student Support
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 font-medium">
                            Our team of expert consultants is available globally to guide you through your higher education journey.
                        </p>
                        <div className="flex items-start gap-3">
                            <Icon icon="solar:map-point-bold" className="text-white text-xl mt-1" />
                            <div>
                                <h4 className="text-white font-semibold">HQ Dhaka</h4>
                                <p className="text-sm text-gray-500">Banani, Road 11, Tower 42, Dhaka 1213</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Socials */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:phone-calling-linear" className="text-white" />
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <Link href="tel:+8801700000000" className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl hover:bg-white hover:text-black transition-all group">
                                <Icon icon="solar:phone-linear" className="text-white group-hover:text-black transition-colors" />
                                <span className="text-sm font-bold">+880 17XX XXX XXX</span>
                            </Link>
                            <Link href="mailto:info@Career Sync.com" className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl hover:bg-white hover:text-black transition-all group">
                                <Icon icon="solar:letter-linear" className="text-white group-hover:text-black transition-colors" />
                                <span className="text-sm font-bold">info@Career Sync.com</span>
                            </Link>
                        </div>

                        <div className="flex gap-4 mt-8">
                            {["solar:facebook-linear", "solar:instagram-linear", "solar:linkedin-linear", "solar:cloning-linear"].map(icon => (
                                <Link key={icon} href="#" className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                                    <Icon icon={icon} className="text-2xl" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>© 2026 Career Sync Global. Empowering Future Leaders.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

