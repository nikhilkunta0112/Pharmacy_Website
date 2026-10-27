import { SiteHeader } from "@/components/header";
import { Brand } from "@/components/brand";
import { navigation, pharmacy } from "@/lib/content";
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
      <footer>
        <div className="container footer-main">
          <a href="#home">
            <Brand />
          </a>
          <p>
            A personal approach.
            <br />A healthier everyday.
          </p>
          <nav aria-label="Footer navigation">
            {navigation.slice(1).map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Elevate Care Pharmacy</span>
          <div>
            {pharmacy.privacyUrl ? (
              <a href={pharmacy.privacyUrl}>Privacy Policy</a>
            ) : (
              <span>Privacy policy pending approval</span>
            )}
            <a href="/accessibility">Accessibility</a>
          </div>
          <span>Designed around people.</span>
        </div>
      </footer>
    </>
  );
}
