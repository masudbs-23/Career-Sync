import { notFound } from "next/navigation";
import { InstitutionService } from "@/lib/institution/actions";
import InstitutionDetailsContent from "./InstitutionDetailsContent";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function InstitutionDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const institution = await InstitutionService.getById(id);

    if (!institution) {
        notFound();
    }

    return <InstitutionDetailsContent institution={institution} />;
}
