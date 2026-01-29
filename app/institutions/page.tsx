import { Suspense } from "react";
import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import InstitutionList from "@/components/features/institution/InstitutionList";
import { InstitutionService } from "@/lib/institution/actions";
import { ListSkeleton } from "@/components/shared/Skeleton";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Institutions - Career Sync",
    description: "Browse our extensive collection of top-rated institutions.",
};

export default async function InstitutionsPage() {
    const institutions = await InstitutionService.getAll();

    return (
        <div className="pb-20">
            <PageHero
                title="Find Your Dream Institution"
                description="Browse through our vetted list of top universities and colleges to kickstart your career."
                 image="/images/hero/university.jpg"
                icon="solar:buildings-2-bold"
            />

            <div className="container mx-auto px-4 mt-12">
                <Suspense fallback={<ListSkeleton count={8} />}>
                    <InstitutionList
                        institutions={institutions}
                        showView={true}
                    />
                </Suspense>
            </div>
        </div>
    );
}
