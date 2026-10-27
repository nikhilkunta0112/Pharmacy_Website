import IndexListCarousel from "@/components/ui/index-list-carousel";
import { approachSlides } from "@/lib/elevate-approach";

export function WhyElevate() {
  return (
    <section id="about" className="about-section">
      <IndexListCarousel
        slides={approachSlides}
        editorial={
          <>
            <p className="eyebrow approach-label">THE ELEVATE CARE APPROACH</p>
            <h2 className="display">
              Good pharmacy care
              <br />
              feels <em>personal.</em>
            </h2>
            <p>
              Behind every prescription is a person, a routine, and a life to
              get back to. Our vision is pharmacy care that makes room for all
              three.
            </p>
          </>
        }
      />
    </section>
  );
}
