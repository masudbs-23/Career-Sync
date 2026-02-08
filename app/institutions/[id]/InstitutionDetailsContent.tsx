"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import BackButton from "@/components/shared/BackButton";

interface InstitutionDetailsContentProps {
    institution: any;
}

export default function InstitutionDetailsContent({ institution }: InstitutionDetailsContentProps) {
    const [activeTab, setActiveTab] = useState("programs");

    const tabs = [
        { id: "programs", name: "Programs", icon: "solar:notebook-bookmark-linear" },
        { id: "scholarships", name: "Scholarships", icon: "solar:diploma-verified-linear" },
        { id: "facilities", name: "Campus Facilities", icon: "solar:buildings-linear" },
        { id: "requirements", name: "Requirements", icon: "solar:checklist-minimalistic-linear" },
    ];

    return (
        <div className="min-h-screen pb-20">
            <main className="w-full lg:w-9/12 lg:mx-auto px-4 py-8">
                {/* Top Section: Image and Info */}
                <div className="bg-white   overflow-hidden mb-8">
                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96 bg-gray-100">
                        {institution.image ? (
                            <Image
                                src={institution.image}
                                alt={institution.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Icon icon="solar:buildings-2-bold-duotone" className="text-8xl text-gray-200" />
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                            {/* Left: University Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                                    {institution.name}
                                </h1>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Icon icon="solar:map-point-linear" className="text-xl shrink-0" />
                                        <span className="text-lg">{institution.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Icon icon="solar:calendar-date-linear" className="text-xl shrink-0" />
                                        <span className="text-lg">Established {institution.establishedYear}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Icon icon="solar:link-linear" className="text-xl shrink-0" />
                                        <a 
                                            href={institution.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:underline text-lg break-all"
                                        >
                                            {institution.website}
                                        </a>
                                    </div>
                                    <div className="pt-4">
                                        <button className="px-8 py-3 bg-[#0BF455] text-white font-bold rounded-full hover:bg-[#0BF455]/90 transition-colors shadow-lg">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white ">
                    {/* Tab Navigation */}
                    <div className="">
                        <div className="flex flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                                        activeTab === tab.id
                                            ? "text-black border-black"
                                            : "text-gray-500 border-transparent hover:text-gray-700"
                                    }`}
                                >
                                    <Icon icon={tab.icon} className="text-xl" />
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 md:p-8">
                        {/* Programs Tab */}
                        {activeTab === "programs" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Available Programs</h2>
                                <div className="grid gap-4">
                                    {institution.programs.map((program: any) => (
                                        <div key={program._id} className="border border-gray-100 rounded-2xl p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                                <div>
                                                    <h3 className="font-bold text-lg text-black">{program.name}</h3>
                                                    <p className="text-sm text-gray-500">{program.degree} • {program.duration}</p>
                                                </div>
                                                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                                    {program.intake} Intake
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {program.subjects.map((subject: string, idx: number) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Scholarships Tab */}
                        {activeTab === "scholarships" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Available Scholarships</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {institution.scholarships.map((scholarship: any) => (
                                        <div key={scholarship._id} className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6">
                                            <h3 className="font-bold text-orange-900 mb-2">{scholarship.name}</h3>
                                            <p className="text-orange-700 font-medium text-lg">{scholarship.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Facilities Tab */}
                        {activeTab === "facilities" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Campus Facilities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {institution.facilities.map((facility: string, index: number) => (
                                        <div key={index} className="flex flex-col items-center justify-center gap-3 p-4 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors">
                                            <Icon icon="solar:smart-home-angle-linear" className="text-2xl text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requirements Tab */}
                        {activeTab === "requirements" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Admission Requirements</h2>
                                <ul className="space-y-4">
                                    {institution.requirements.map((req: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <Icon icon="solar:check-circle-linear" className="text-green-500 mt-0.5 shrink-0 text-xl" />
                                            <span className="text-lg">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
