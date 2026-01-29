"use client";

import { InstitutionService } from "@/lib/institution/actions";
import InstitutionList from "@/components/features/institution/InstitutionList";
import { useState, useEffect } from "react";
import { Institution } from "@/types/institution";

export default function ExploreInstitutions() {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInstitutions = async () => {
            try {
                const data = await InstitutionService.getFeatured();
                setInstitutions(data); // getFeatured already returns only 4 institutions
            } catch (error) {
                console.error("Error loading institutions:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInstitutions();
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <InstitutionList
                    institutions={institutions}
                    loading={loading}
                    title="Featured Institutions"
                    subtitle="Top Rated"
                    showView={false}
                    viewAllLink="/institutions"
                />
            </div>
        </section>
    );
}
