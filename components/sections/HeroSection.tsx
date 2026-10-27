import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialCollage } from "./hero/EditorialCollage";
import "./hero/hero.css";
export function HeroSection() {
  return (
    <section id="home" className="care-hero" aria-labelledby="care-heading">
      <div className="care-hero-main">
        <div className="care-hero-copy">
          <h1 id="care-heading">
            <span>Pharmacy Care</span>
            <span>Made Simple.</span>
          </h1>
          <p className="care-description">
            A friendlier pharmacy experience with personal prescription
            guidance, pharmacist support, and care that starts with you.
          </p>
          <div className="care-actions">
            <Button href="#prescriptions">
              Get Started <ArrowRight size={23} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary">
              Contact Our Team
            </Button>
          </div>
        </div>
        <EditorialCollage />
      </div>
    </section>
  );
}
