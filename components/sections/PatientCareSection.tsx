import { Sprout } from "lucide-react";
import "./personal.css";

/* One photograph, clipped by two slanted capsules so the halves read as a single scene. */
const CAPSULE_W = 250;
const CAPSULE_H = 600;
const capsules = [
  { id: "pc-clip-1", cx: 290, cy: 540 },
  { id: "pc-clip-2", cx: 700, cy: 450 },
];

export function PatientCareSection() {
  return (
    <section className="personal-section container">
      <div className="pc-copy">
        <span className="section-number">A SIMPLE BELIEF</span>
        <Sprout size={34} strokeWidth={1.3} aria-hidden="true" />
        <h2 className="display">
          More than a prescription.
          <br />
          <em>A person worth knowing.</em>
        </h2>
        <p>
          Care should feel like a conversation. A chance to ask a question,
          understand your options, and feel heard.
        </p>
        <span className="personal-signature">
          That’s the spirit of Elevate Care.
        </span>
      </div>
      <div className="pc-visual">
        <svg
          viewBox="0 0 1000 1000"
          role="img"
          aria-label="A pharmacist and an older customer talking at a pharmacy counter"
        >
          <defs>
            {capsules.map(({ id, cx, cy }) => (
              <clipPath id={id} key={id}>
                <rect
                  x={cx - CAPSULE_W / 2}
                  y={cy - CAPSULE_H / 2}
                  width={CAPSULE_W}
                  height={CAPSULE_H}
                  rx={CAPSULE_W / 2}
                  transform={`rotate(40 ${cx} ${cy})`}
                />
              </clipPath>
            ))}
          </defs>
          {capsules.map(({ id }, i) => (
            <g className={`pc-piece pc-piece-${i + 1}`} key={id}>
              <g clipPath={`url(#${id})`}>
                <image
                  href="/images/services/attention.jpg"
                  x="0"
                  y="-37"
                  width="1150"
                  height="1150"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            </g>
          ))}
        </svg>
        <span className="pc-label pc-label-1">Ask a question</span>
        <span className="pc-label pc-label-2">Feel heard</span>
      </div>
    </section>
  );
}
