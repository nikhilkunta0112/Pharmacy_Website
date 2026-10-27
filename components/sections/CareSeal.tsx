import { useId } from "react";

export function CareSeal() {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className="service-care-seal"
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="100" fill="#D2DCF0" />
      <defs>
        <path id={`${id}-upper`} d="M 36,100 A 64,64 0 0,1 164,100" />
        <path id={`${id}-lower`} d="M 30,105 A 75,75 0 0,0 170,105" />
      </defs>
      <g fill="#1E3B6E" fontSize="13" fontWeight="600" letterSpacing="2.3">
        <text>
          <textPath href={`#${id}-upper`} startOffset="50%" textAnchor="middle">
            PERSONAL CARE
          </textPath>
        </text>
        <text>
          <textPath href={`#${id}-lower`} startOffset="50%" textAnchor="middle">
            REAL SUPPORT
          </textPath>
        </text>
      </g>
      <g
        fill="none"
        stroke="#1E3B6E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M72 98h56c-2 20-11 29-28 29s-26-9-28-29Z M88 127v7h24v-7 M104 96l19-22a5 5 0 0 1 8 6l-16 18 M97 95c-15 0-21-10-23-20 14 0 24 6 24 19 M80 81l12 12" />
      </g>
      <circle cx="29" cy="100" r="2" fill="#1E3B6E" />
      <circle cx="171" cy="100" r="2" fill="#1E3B6E" />
    </svg>
  );
}
