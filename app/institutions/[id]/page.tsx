import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
import { InstitutionService } from "@/lib/institution/actions";
import BackButton from "@/components/shared/BackButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const institution = await InstitutionService.getById(id);

    if (!institution) {
        return {
            title: "Institution Not Found",
        };
    }

    return {
        title: `${institution.name} - Career Sync`,
        description: `Learn more about ${institution.name}, established in ${institution.establishedYear}.`,
    };
}

export default async function InstitutionDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const institution = await InstitutionService.getById(id);

    if (!institution) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <BackButton />
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image & Quick Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                {institution.image ? (
                                    <Image
                                        src={institution.image}
                                        alt={institution.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Icon icon="solar:buildings-2-bold-duotone" className="text-6xl text-gray-200" />
                                    </div>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-black mb-2">{institution.name}</h1>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-gray-600">
                                    <Icon icon="solar:map-point-linear" className="text-xl mt-0.5 shrink-0" />
                                    <span>{institution.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Icon icon="solar:calendar-date-linear" className="text-xl shrink-0" />
                                    <span>Est. {institution.establishedYear}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Icon icon="solar:link-linear" className="text-xl shrink-0" />
                                    <a href={institution.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        {institution.website}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Icon icon="solar:checklist-minimalistic-linear" className="text-xl" />
                                Requirements
                            </h3>
                            <ul className="space-y-3">
                                {institution.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Icon icon="solar:check-circle-linear" className="text-green-500 mt-0.5 shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Programs */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Icon icon="solar:notebook-bookmark-linear" className="text-2xl" />
                                Available Programs
                            </h2>
                            <div className="grid gap-4">
                                {institution.programs.map((program) => (
                                    <div key={program._id} className="border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 transition-colors">
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
                                            {program.subjects.map((subject, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Scholarships */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Icon icon="solar:diploma-verified-linear" className="text-2xl" />
                                Scholarships
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {institution.scholarships.map((scholarship) => (
                                    <div key={scholarship._id} className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5">
                                        <h3 className="font-bold text-orange-900 mb-1">{scholarship.name}</h3>
                                        <p className="text-orange-700 font-medium">{scholarship.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Icon icon="solar:buildings-linear" className="text-2xl" />
                                Campus Facilities
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {institution.facilities.map((facility, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-3 p-4 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors">
                                        <Icon icon="solar:smart-home-angle-linear" className="text-2xl text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
