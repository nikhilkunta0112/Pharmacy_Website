import { ArrowUpRight, ChevronRight } from "lucide-react";
import { pharmacy } from "@/lib/content";
import "./contact.css";

type CapsuleProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  a: string;
  b: string;
};

/* Two-tone capsule drawn around its own centre, then rotated into place. */
function Capsule({ x, y, w, h, rot, a, b }: CapsuleProps) {
  const r = h / 2;
  const left = -w / 2 + r;
  return (
    <g className="ct-item" transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} fill={b} />
      <path
        d={`M ${left} ${-r} H 0 V ${r} H ${left} A ${r} ${r} 0 0 1 ${left} ${-r} Z`}
        fill={a}
      />
      <rect
        x={left}
        y={-r + 7}
        width={w - h}
        height={6}
        rx={3}
        fill="#fff"
        opacity="0.35"
      />
    </g>
  );
}

function Tablet({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) {
  return (
    <g className="ct-item" transform={`translate(${x} ${y})`}>
      <circle r={r} fill={fill} />
      <circle r={r - 5} fill="none" stroke="#000" strokeOpacity="0.08" />
      <rect x={-r + 6} y={-1.5} width={2 * r - 12} height={3} rx={1.5} fill="#000" opacity="0.12" />
    </g>
  );
}

function PharmacyArt() {
  return (
    <svg
      className="ct-art"
      viewBox="0 0 220 620"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Capsule x={70} y={80} w={170} h={62} rot={-38} a="#F5A31A" b="#ffffff" />
      <Tablet x={144} y={196} r={32} fill="#ffffff" />
      <Capsule x={26} y={290} w={190} h={68} rot={28} a="#4E74B4" b="#BDD0EC" />
      <g className="ct-item" transform="translate(150 410)">
        <rect x={-14} y={-42} width={28} height={84} rx={9} fill="#F5A31A" />
        <rect x={-42} y={-14} width={84} height={28} rx={9} fill="#F5A31A" />
        <rect x={-6} y={-36} width={5} height={30} rx={2.5} fill="#fff" opacity="0.35" />
      </g>
      <Capsule x={84} y={530} w={150} h={56} rot={-52} a="#ffffff" b="#4E74B4" />
      <Tablet x={20} y={600} r={26} fill="#F5A31A" />
      <circle className="ct-item" cx="196" cy="300" r="6" fill="#BDD0EC" />
      <circle className="ct-item" cx="120" cy="170" r="4" fill="#F5A31A" />
    </svg>
  );
}

const help = [
  ["Transfer a prescription", "#prescriptions"],
  ["Refill guidance", "#faq"],
  ["For healthcare professionals", "#providers"],
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="ct-left">
        <PharmacyArt />
        <div className="ct-left-content">
          <p className="ct-eyebrow">Let’s connect</p>
          <h2>
            Your neighborhood.
            <br />
            Your pharmacy.
          </h2>
          <p className="ct-intro">
            Verified ways to reach Elevate Care will appear here as soon as
            they’re confirmed.
          </p>
          <dl className="ct-details">
            <div>
              <dt>Phone</dt>
              <dd>
                {pharmacy.phone ? (
                  <a href={`tel:${pharmacy.phone}`}>{pharmacy.phone}</a>
                ) : (
                  <span className="ct-pending">Awaiting confirmation</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Visit us</dt>
              <dd>
                {pharmacy.address ?? (
                  <span className="ct-pending">Address to be confirmed</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>
                {pharmacy.hours ?? (
                  <span className="ct-pending">Hours to be confirmed</span>
                )}
              </dd>
            </div>
          </dl>
          <a className="ct-team-link" href="#providers">
            Elevate Care pharmacy team <ArrowUpRight size={16} />
          </a>
        </div>
        <span className="ct-notch" aria-hidden="true">
          <ChevronRight size={20} />
        </span>
      </div>

      <div className="ct-right">
        <h3>How can we help?</h3>
        <ul className="ct-links">
          {help.map(([label, href]) => (
            <li key={href}>
              <a href={href}>
                {label}
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="ct-note">
          This preview cannot accept patient requests. Please do not share
          personal or medical information through this website.
        </p>
        <a className="ct-cta" href="#faq">
          Read the FAQs
        </a>
      </div>
    </section>
  );
}
