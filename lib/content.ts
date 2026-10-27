export const pharmacy = {
  name: "Elevate Care Pharmacy",
  phone: null as string | null,
  address: null as string | null,
  hours: null as string | null,
  secureTransferUrl: null as string | null,
  privacyUrl: null as string | null,
};
export const navigation = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Prescriptions", "#prescriptions"],
  ["About", "#about"],
  ["For Providers", "#providers"],
  ["Contact", "#contact"],
] as const;
export const services = [
  {
    name: "Prescription transfers",
    description:
      "Understand what to ask when moving a prescription to a new pharmacy.",
    confirmed: false,
  },
  {
    name: "Prescription refills",
    description:
      "Find out how to request your next refill through an approved channel.",
    confirmed: false,
  },
  {
    name: "Medication synchronization",
    description: "Ask whether coordinating your refill dates is an option.",
    confirmed: false,
  },
  {
    name: "Medication consultation",
    description: "Ask about available pharmacist consultation options.",
    confirmed: false,
  },
  {
    name: "Prescription delivery",
    description:
      "Confirm delivery availability and any applicable requirements.",
    confirmed: false,
  },
  {
    name: "Immunizations",
    description:
      "Confirm available vaccines, eligibility, and appointment requirements.",
    confirmed: false,
  },
];
export const faqs = [
  [
    "How do I transfer my prescription?",
    "Start by contacting the pharmacy through a verified channel. Ask which prescriptions are eligible and how to share the required details securely. A transfer cannot be started on this preview website.",
  ],
  [
    "How can I request a refill?",
    "An approved refill channel has not yet been connected to this website. Do not enter prescription or personal medical information here. Confirm the refill process directly with the pharmacy.",
  ],
  [
    "Does the pharmacy offer delivery?",
    "Delivery availability, service area, and any fees still need confirmation. This preview does not advertise a delivery service.",
  ],
  [
    "Which insurance plans are accepted?",
    "Insurance participation has not been confirmed. Check directly with the pharmacy and your insurance plan before arranging a prescription.",
  ],
  [
    "How can healthcare providers get in touch?",
    "Verified provider contact and e-prescribing details will be listed in the contact section once approved. No prescription submission channel is available on this preview.",
  ],
];
