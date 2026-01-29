import Hero from "@/components/shared/Hero";
import StatsSection from "@/components/features/home/StatsSection";
import ExploreDestinations from "@/components/features/home/ExploreDestinations";
import ExploreInstitutions from "@/components/features/home/ExploreInstitutions";
import HowItWorks from "@/components/features/home/HowItWorks";
import BackOfficeDetail from "@/components/features/home/BackOfficeDetail";
import WhyChooseUs from "@/components/features/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />

      <ExploreDestinations />
      <ExploreInstitutions />
      <StatsSection />
      <HowItWorks />
      <BackOfficeDetail />
      <WhyChooseUs />
    </>
  );
}
