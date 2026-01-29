"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";
import { ListSkeleton } from "./shared/Skeleton";

interface MedicineListProps {
    medicines: Medicine[];
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
}

export default function MedicineList({
    medicines,
    title = "Featured Medicines",
    subtitle = "Online Pharmacy",
    viewAllLink = "/medicine",
    loading = false
}: MedicineListProps) {
    const { addToCart, addToWishlist, isInWishlist } = useCart();

    if (loading) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded-full w-24 animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded-full w-64 animate-pulse" />
                        </div>
                    </div>
                    <ListSkeleton count={4} />
                </div>
            </section>
        );
    }

    if (!medicines || medicines.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-2">
                        <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase pl-1">{subtitle}</span>
                        <h2 className="text-4xl font-bold text-black tracking-tight">{title}</h2>
                    </div>
                    {viewAllLink && (
                        <Link
                            href={viewAllLink}
                            className="hidden md:flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors group"
                        >
                            Browse Store <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl group">
                            <Link href={`/medicine/${medicine._id}`} className="relative rounded-xl bg-gray-50 overflow-hidden h-64 w-full mb-4 flex items-center justify-center p-8">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' });
                                    }}
                                    className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                                >
                                    <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                                </button>
                                {medicine.image ? (
                                    <Image
                                        src={medicine.image.url}
                                        alt={medicine.name}
                                        fill
                                        className="object-contain mix-blend-multiply transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                ) : (
                                    <Icon icon="solar:medical-kit-linear" className="text-6xl text-gray-200" />
                                )}
                            </Link>

                            <div className="flex-1 flex flex-col">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{medicine.category || "General"}</p>
                                    <Link href={`/medicine/${medicine._id}`}>
                                        <h3 className="text-lg font-bold text-black line-clamp-1 hover:underline">{medicine.name}</h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{medicine.company}</p>
                                </div>

                                <div className="mt-auto pt-4 flex items-center justify-between mt-4">
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-sm font-medium text-gray-500">$</span>
                                        <span className="text-2xl font-bold text-black">{medicine.price}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                        className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10"
                                    >
                                        <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {viewAllLink && (
                    <div className="mt-12 text-center md:hidden">
                        <Link
                            href={viewAllLink}
                            className="inline-flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5"
                        >
                            Browse Store <Icon icon="solar:arrow-right-linear" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
