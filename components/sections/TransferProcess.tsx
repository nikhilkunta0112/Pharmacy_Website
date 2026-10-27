import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";
import { pharmacy } from "@/lib/content";
import "./transfer.css";

const steps = [
  {
    n: "01",
    title: "Get in touch",
    copy: "Tell the pharmacy team you would like to transfer a prescription, using a verified contact channel.",
  },
  {
    n: "02",
    title: "Share details securely",
    copy: "Follow the approved process to provide the information the pharmacy needs.",
  },
  {
    n: "03",
    title: "Understand what comes next",
    copy: "Ask the team about eligibility, timing, and any additional requirements.",
  },
];

const readyList = [
  "Your current medication list",
  "Your prescriber’s name",
  "Your previous pharmacy’s details",
];

export function TransferProcess() {
  return (
    <section id="prescriptions" className="transfer-section">
      <div className="container">
        <div className="tp-top">
          <div className="tp-intro-block">
            <Eyebrow>A NEW PHARMACY. A THOUGHTFUL START.</Eyebrow>
            <h2 className="display">
              Switching pharmacies?
              <br />
              Let’s take it <em>step by step.</em>
            </h2>
            <p className="tp-intro">
              Here’s what to expect when starting a prescription transfer.
            </p>
          </div>
          <div className="tp-photo">
            <Image
              src="/images/care.jpg"
              alt="A pharmacist in a white coat handing a small medication bottle across the counter to a customer"
              fill
              sizes="(max-width: 1023px) 100vw, 600px"
            />
          </div>
        </div>

        <div className="tp-panel">
          <ol className="tp-steps">
            {steps.map(({ n, title, copy }) => (
              <li className="tp-step" key={n}>
                <span className="tp-step-number" aria-hidden="true">
                  {n}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>

          <div className="tp-footer">
            <div className="tp-ready">
              <p className="tp-ready-title">Good to have ready</p>
              <ul>
                {readyList.map((item) => (
                  <li key={item}>
                    <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tp-bottom">
              <Button href={pharmacy.secureTransferUrl ?? "#contact"}>
                View contact information <ArrowUpRight size={17} />
              </Button>
              <p>
                Transfer eligibility depends on the prescription. A secure
                transfer channel is not connected to this preview.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
