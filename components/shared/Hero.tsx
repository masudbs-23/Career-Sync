"use client";

import { useEffect, useState } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const items = [
    {
        id: "university",
        title: "Top Universities",
        subtitle: "Global Recognition",
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop",
        color: "bg-gray-100",
    },
    {
        id: "institution",
        title: "World-Class Institutions",
        subtitle: "Academic Excellence",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
        color: "bg-gray-100",
    },
    {
        id: "events",
        title: "Global Education Events",
        subtitle: "Connect & Learn",
        image: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=crop",
        color: "bg-gray-100",
    },
];

export default function Hero() {
    const [activeId, setActiveId] = useState(items[0].id);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveId((current) => {
                const currentIndex = items.findIndex((item) => item.id === current);
                const nextIndex = (currentIndex + 1) % items.length;
                return items[nextIndex].id;
            });
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const activeItem = items.find((item) => item.id === activeId);

    return (
        <section className="w-full bg-white overflow-hidden py-10 md:py-20 text-black">
            <div className="container mx-auto px-4 md:px-6">
                <LayoutGroup>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">

                        {/* Left Side: Content & List */}
                        <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="inline-block py-1.5 px-4 rounded-full border border-gray-100 bg-gray-50 text-black font-semibold text-sm mb-4 tracking-wide uppercase">
                                        #1 Education Consultant
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                                        Your Future, <br />
                                        <span className="text-black">Our Global Vision</span>
                                    </h1>
                                    <p className="text-lg text-gray-600 max-w-lg pt-4 leading-relaxed font-medium">
                                        Empowering students to achieve their dreams of studying abroad.
                                        From university selection to visa success, we are with you at every step.
                                    </p>
                                </motion.div>

                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href="/universities"
                                        className="px-8 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition transform hover:scale-105"
                                    >
                                        Explore Universities
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="px-8 py-3 bg-white border border-black text-black font-bold uppercase tracking-wider hover:bg-gray-50 transition"
                                    >
                                        Free Consultation
                                    </Link>
                                </div>
                            </div>

                            {/* The List of Items (Left Side) */}
                            <div className="mt-8">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                                    Our Global Network
                                </p>
                                <div className="flex gap-4 md:gap-8">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-gray-100 p-1"
                                        >
                                            {activeId !== item.id && (
                                                <motion.div
                                                    layoutId={`hero-image-${item.id}`}
                                                    className="relative w-full h-full rounded-full overflow-hidden shadow-sm"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 350,
                                                        damping: 25,
                                                    }}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            )}

                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 z-0">
                                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.id}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Featured Display Area */}
                        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2">
                            <div className={`absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gray-50 transition-colors duration-500 -z-10`}></div>

                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    item.id === activeId && (
                                        <motion.div
                                            key={item.id}
                                            layoutId={`hero-image-${item.id}`}
                                            className="relative w-72 h-72 md:w-[700px] md:h-[700px] rounded-full bg-white shadow-[0_0_100px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
}
