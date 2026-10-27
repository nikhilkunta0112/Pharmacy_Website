"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/content";
import { Brand } from "./brand";
import { Button } from "./ui/button";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Button href="#contact" className="header-cta">
          Contact Our Team
        </Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="menu-button" aria-label="Open navigation">
            <Menu />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="menu-panel">
              <Dialog.Title>Explore Elevate Care</Dialog.Title>
              <Dialog.Description>
                Find care information and next steps.
              </Dialog.Description>
              <Dialog.Close
                className="menu-close"
                aria-label="Close navigation"
              >
                <X />
              </Dialog.Close>
              <nav aria-label="Mobile navigation">
                {navigation.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight size={20} />
                  </a>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
