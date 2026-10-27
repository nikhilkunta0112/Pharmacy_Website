"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content";
export function FAQ() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="faq-0"
      className="faq-list"
    >
      {faqs.map(([q, a], i) => (
        <Accordion.Item className="faq-item" value={`faq-${i}`} key={q}>
          <Accordion.Header>
            <Accordion.Trigger>
              <span className="faq-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="faq-question">{q}</span>
              <span className="faq-toggle" aria-hidden="true">
                <Plus size={18} className="faq-plus" />
                <Minus size={18} className="faq-minus" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p>{a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
