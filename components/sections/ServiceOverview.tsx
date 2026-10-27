import { ArrowUpRight } from "lucide-react";
import { nextSteps, nextStepsIntro } from "./next-steps/content";
import "./next-steps/next-steps.css";

function ServiceActionPanel({ step }: { step: (typeof nextSteps)[number] }) {
  const Icon = step.icon;
  return (
    <a className={`next-step-action next-step-${step.tone}`} href={step.href}>
      <span className="next-step-icon">
        <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="next-step-copy">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
      <span className="next-step-arrow" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={1.7} />
      </span>
    </a>
  );
}

export function ServiceOverview() {
  return (
    <section className="next-steps-section" aria-labelledby="pathways-heading">
      <div className="next-steps-composition">
        <div className="next-step-intro">
          <span className="next-step-accent" aria-hidden="true" />
          <div className="next-step-panel">
            <span className="next-step-eyebrow">{nextStepsIntro.eyebrow}</span>
            <h2 id="pathways-heading">{nextStepsIntro.heading}</h2>
            <p>{nextStepsIntro.description}</p>
          </div>
        </div>
        <div className="next-steps-actions">
          {nextSteps.map((step) => (
            <ServiceActionPanel key={step.href} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
