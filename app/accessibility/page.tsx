import Link from "next/link";
export default function Accessibility() {
  return (
    <main className="container legal-page">
      <Link href="/">← Back to Elevate Care</Link>
      <h1 className="display">Accessibility information</h1>
      <p>
        This website is designed to support keyboard navigation, screen readers,
        text resizing, and reduced motion preferences.
      </p>
      <h2>Using this website</h2>
      <p>
        Use Tab to move between links and controls. The mobile navigation
        supports Escape to close. Frequently asked questions can be opened with
        Enter or Space.
      </p>
      <h2>Ongoing review</h2>
      <p>
        Accessibility testing and improvements are ongoing. A verified contact
        channel for reporting accessibility barriers will be added when the
        pharmacy’s contact details are approved.
      </p>
    </main>
  );
}
