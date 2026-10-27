import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./sections.css";
const plein = localFont({
  src: "./fonts/Plein-Variable.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-plein",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: "Arial",
});
export const metadata: Metadata = {
  title: "Elevate Care Pharmacy | Your Health. Elevated.",
  description:
    "A personal approach to pharmacy care. Explore prescription guidance and learn about Elevate Care Pharmacy.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Elevate Care Pharmacy",
    description: "Your Health. Elevated.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plein.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
