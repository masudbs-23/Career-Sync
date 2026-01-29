"use client";

import { Icon } from "@iconify/react";
import { Section } from "@/components/ui";

export default function ExploreInstitutions() {
    return (
        <Section className="bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl text-left">
                    <h2 className="text-4xl font-bold text-black mb-4">Explore Top Destinations</h2>
                    <p className="text-gray-500 font-medium">
                        Find and compare all institutions worldwide. Whether it's for Bachelors or Higher Education, we cover it all.
                    </p>
                </div>
                <button className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
                    View All Countries
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                    { name: "United Kingdom", flag: "flagpack:gb-uk" },
                    { name: "USA", flag: "flagpack:us" },
                    { name: "Canada", flag: "flagpack:ca" },
                    { name: "Australia", flag: "flagpack:au" },
                    { name: "Germany", flag: "flagpack:de" },
                    { name: "Malaysia", flag: "flagpack:my" },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl flex flex-col items-center gap-4 hover:shadow-xl transition-all cursor-pointer group border border-gray-100">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-5xl overflow-hidden group-hover:scale-110 transition-transform">
                            <Icon icon={item.flag} />
                        </div>
                        <span className="font-bold text-black text-sm">{item.name}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
}
