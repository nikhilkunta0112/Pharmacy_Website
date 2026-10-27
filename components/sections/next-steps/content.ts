import { Pill, RefreshCw, MessagesSquare } from "lucide-react";

export const nextStepsIntro = {
  heading: "How can we help today?",
  eyebrow: "01 / YOUR NEXT STEP",
  description:
    "From prescription transfers to refill guidance, we're here to help you take the next step.",
};
export const nextSteps = [
  {
    title: "Transfer a prescription",
    description: "Learn what to expect when switching pharmacies.",
    href: "#prescriptions",
    icon: Pill,
    tone: "mint",
  },
  {
    title: "Refill guidance",
    description: "Know the next steps for your next prescription.",
    href: "#faq",
    icon: RefreshCw,
    tone: "cyan",
  },
  {
    title: "Contact information",
    description: "Find the right way to reach the pharmacy team.",
    href: "#contact",
    icon: MessagesSquare,
    tone: "yellow",
  },
] as const;
