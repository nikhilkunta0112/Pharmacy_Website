import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import IndexListCarousel from "@/components/ui/index-list-carousel";
import { CareSeal } from "./CareSeal";
import { serviceStories } from "@/lib/service-stories";
import { services } from "@/lib/content";
import "./services-editorial.css";

const guidancePoints = [
  {
    icon: ClipboardList,
    title: "What to bring",
    copy: "Your current medication list and the name of your prescriber.",
  },
  {
    icon: MessageSquareText,
    title: "What to ask",
    copy: "About timing, refills, and how your pharmacist can help you stay on track.",
  },
  {
    icon: ShieldCheck,
    title: "Why verified matters",
    copy: "Share health details only through channels you trust, never open forms.",
  },
];

export function ServicesSection() {
  const confirmed = services.filter((s) => s.confirmed);
  return (
    <section
      id="services"
      className="services-editorial"
      aria-label="Support for the everyday"
    >
      <IndexListCarousel
        slides={serviceStories}
        variant="circular"
        imageSide="right"
        ariaLabel="Everyday pharmacy support"
        decoration={
          <>
            <div className="service-photo-accent" aria-hidden="true" />
            <CareSeal />
          </>
        }
        editorial={
          <>
            <p className="service-editorial-label">SUPPORT FOR THE EVERYDAY</p>
            <h2 className="service-editorial-heading">
              Care that fits
              <br />
              into your life.
            </h2>
            <p className="service-editorial-description">
              Start with the essentials. Explore prescription guidance below
              while our full service information is being finalized.
            </p>
            <Button href="#contact" className="service-contact">
              Contact Our Team <ArrowRight size={22} aria-hidden="true" />
            </Button>
          </>
        }
      />
      <div className="rx-banner">
        <svg className="rx-clip-defs" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="rx-photo-curve" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H0.96 C0.88,0.16 0.74,0.36 0.78,0.56 C0.84,0.76 0.94,0.9 1,1 H0 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="rx-photo">
          <div className="rx-photo-frame">
            <Image
              src="/images/guidance/pharmacist.jpg"
              alt="Illustrative photograph of a pharmacist in a white coat and glasses speaking with a customer in a pharmacy"
              fill
              sizes="(max-width: 767px) 100vw, 52vw"
            />
          </div>
        </div>
        <div className="rx-copy">
          <p className="rx-eyebrow">Prescription guidance</p>
          <h3>A clearer path to your next prescription.</h3>
          <p>
            Switching pharmacies or planning a refill? Learn what to ask, what
            to prepare, and why a verified, secure channel matters.
          </p>
          <ul className="rx-points">
            {guidancePoints.map(({ icon: Icon, title, copy }) => (
              <li key={title}>
                <span className="rx-point-icon">
                  <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div>
                  <p className="rx-point-title">{title}</p>
                  <p className="rx-point-copy">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rx-actions">
            <a className="rx-cta" href="#prescriptions">
              Explore the next steps
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="rx-link" href="#contact">
              Talk to our team
            </a>
          </div>
        </div>
      </div>
      {confirmed.length > 0 && (
        <div className="container confirmed-services">
          {confirmed.map((s) => (
            <article key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <a href="#contact">Ask our team</a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
