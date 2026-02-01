"use client";

import InstitutionList from "@/components/features/institution/InstitutionList";
import { InstitutionService } from "@/lib/institution/actions";
import { Institution } from "@/types/institution";
import { useEffect, useState } from "react";

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
        <section className=" bg-white">
            <div className="container mx-auto ">
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
