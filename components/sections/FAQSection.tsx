import Image from "next/image";
import { FAQ } from "@/components/faq";
import "./faq.css";
export function FAQSection() {
  return (
    <section id="faq" className="faq-section container">
      <div className="faq-side">
        <div className="faq-heading">
          <h2 className="display">
            Good questions.
            <br />
            Clear next steps.
          </h2>
          <p>Helpful information before you get started.</p>
        </div>
        <figure className="faq-media">
          <Image
            src="/images/services/convenience.jpg"
            alt="A pharmacist in a white coat handing a plain paper pharmacy bag to a customer across a bright counter"
            fill
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
        </figure>
      </div>
      <FAQ />
    </section>
  );
}
