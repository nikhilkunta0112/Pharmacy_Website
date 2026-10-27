import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { WhyElevate } from "@/components/sections/WhyElevate";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TransferProcess } from "@/components/sections/TransferProcess";
import { PatientCareSection } from "@/components/sections/PatientCareSection";
import { ProviderSection } from "@/components/sections/ProviderSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
export default function Home() {
  return (
    <>
      <div className="preview-note">
        A first look at Elevate Care{" "}
        <span>
          &mdash; Website preview &middot; Service and contact details awaiting
          confirmation
        </span>
      </div>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <ServiceOverview />
        <WhyElevate />
        <ServicesSection />
        <TransferProcess />
        <PatientCareSection />
        <ProviderSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
