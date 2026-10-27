import type { Slide } from "@/components/ui/index-list-carousel";

// Illustrative licensed stock; sources in public/images/approach/README.md.
export const approachSlides: readonly Slide[] = [
  {
    image: "/images/pharmacy.jpg",
    position: "57% 45%",
    title: "Personal attention",
    description: "Space for your questions. Respect for your needs.",
    caption: "A conversation can make all the difference.",
    alt: "A pharmacist speaking with an adult customer beside a medicine display in a traditional pharmacy",
  },
  {
    image: "/images/care.jpg",
    position: "64% 48%",
    title: "Everyday convenience",
    description: "A thoughtful approach to the routines that matter.",
    caption: "Care that fits into your day.",
    alt: "A pharmacist handing a small medicine bottle to an adult customer across a pharmacy counter",
  },
  {
    image: "/images/approach/guidance.jpg",
    position: "62% 44%",
    title: "Clear medication guidance",
    description: "Plain language. A clearer understanding of your next step.",
    caption: "Confidence starts with clarity.",
    alt: "An adult customer discussing a medicine bottle with a pharmacist at a wooden pharmacy counter",
  },
];
