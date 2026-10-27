import Image from "next/image";
import { ArrowUpRight, HeartPulse } from "lucide-react";
import "./providers.css";

export function ProviderSection() {
  return (
    <section id="providers" className="providers-section">
      <div className="pv-photo">
        <Image
          src="/images/providers/medicines.jpg"
          alt="Colourful blister packs of capsules and tablets on a white surface"
          fill
          sizes="(max-width: 767px) 100vw, 70vw"
        />
      </div>
      <div className="pv-circle">
        <span className="pv-dot pv-dot-1" aria-hidden="true" />
        <span className="pv-dot pv-dot-2" aria-hidden="true" />
        <span className="pv-badge" aria-hidden="true">
          <HeartPulse size={22} strokeWidth={1.8} />
        </span>
        <div className="pv-content">
          <p className="pv-eyebrow">For healthcare professionals</p>
          <h2>
            On the same side.
            <br />
            <em>Your patient’s.</em>
          </h2>
          <p className="pv-copy">
            Connect with Elevate Care Pharmacy for prescription coordination and
            pharmacy-related questions.
          </p>
          <a className="pv-cta" href="#contact">
            Provider contact information <ArrowUpRight size={16} />
          </a>
          <small>
            Verified e-prescribing and submission details will be added when
            available.
          </small>
        </div>
      </div>
    </section>
  );
}
