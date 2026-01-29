import { Suspense } from "react";
import PageHero from "@/components/shared/PageHero";
import NurseSearch from "@/components/features/nurses/NurseSearch";
import NursesList from "@/components/features/nurses/NursesList";
import { NurseService } from "@/lib/nurses/actions";
import { ListSkeleton } from "@/components/shared/Skeleton";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Nurses - MedEase",
    description: "Find professional nurses for your care.",
};

export default async function NursesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const name = params.name;
    const work = params.work;

    const nurses = await NurseService.getAll({
        page,
        limit,
        name,
        work
    });

    return (
        <div className="pb-20">
            <PageHero
                title="Compassionate Care at Your Doorstep"
                description="Our certified nursing professionals provide dedicated care and assistance tailored to your specific medical needs."
                image="/images/nurse-hero.png"
                icon="solar:heart-pulse-bold"
            />

            <div className="container mx-auto px-4">
                <Suspense fallback={<ListSkeleton count={8} />}>
                    <NursesList
                        nurses={nurses}
                        showSearch={true}
                        initialName={name}
                        initialWork={work}
                    />
                </Suspense>
            </div>
        </div>
    );
}
