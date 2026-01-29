import { Suspense } from "react";
import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import MedicineSearch from "@/components/features/medicine/MedicineSearch";
import MedicineList from "@/components/features/medicine/MedicineList";
import { MedicineService } from "@/lib/medicine/actions";
import { ListSkeleton } from "@/components/shared/Skeleton";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Medicines - MedEase",
    description: "Browse our extensive collection of high-quality medicines.",
};

export default async function MedicinePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const name = params.name;
    const category = params.category;

    const medicines = await MedicineService.getAll({
        page,
        limit,
        search: name,
        category
    });

    return (
        <div className="pb-20">
            <PageHero
                title="Your Health, Our Priority"
                description="Browse through our extensive collection of high-quality medicines from trusted global manufacturers."
                image="/images/medicine-hero.png"
                icon="solar:medical-kit-bold"
            />

            <div className="container mx-auto px-4">
                <Suspense fallback={<ListSkeleton count={8} />}>
                    <MedicineList
                        medicines={medicines}
                        showSearch={true}
                        initialSearch={name}
                    />
                </Suspense>
            </div>
        </div>
    );
}
