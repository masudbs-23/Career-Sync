import Hero from "@/components/shared/Hero";
import StatsSection from "@/components/features/home/StatsSection";
import ExploreInstitutions from "@/components/features/home/ExploreInstitutions";
import HowItWorks from "@/components/features/home/HowItWorks";
import BackOfficeDetail from "@/components/features/home/BackOfficeDetail";
import WhyChooseUs from "@/components/features/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ExploreInstitutions />
      <HowItWorks />
      <BackOfficeDetail />
      <WhyChooseUs />
    </>
  );
}
