import { Brand } from "@/components/brand";
import { navigation, pharmacy } from "@/lib/content";
import "./footer.css";

const help = [
  ["Transfer a prescription", "#prescriptions"],
  ["Frequently asked questions", "#faq"],
  ["Accessibility", "/accessibility"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container sf-grid">
        <div className="sf-brand">
          <a href="#home" aria-label="Elevate Care Pharmacy, back to top">
            <Brand variant="onDark" />
          </a>
          <p>
            A personal approach.
            <br />A healthier everyday.
          </p>
        </div>

        <nav className="sf-col" aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>
            {navigation.slice(1).map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="sf-col" aria-label="Help and information">
          <h2>Help</h2>
          <ul>
            {help.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              {pharmacy.privacyUrl ? (
                <a href={pharmacy.privacyUrl}>Privacy Policy</a>
              ) : (
                <span className="sf-pending">Privacy policy pending approval</span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="container sf-bottom">
        <span>© {new Date().getFullYear()} Elevate Care Pharmacy</span>
        <span>Designed around people.</span>
      </div>
    </footer>
  );
}
