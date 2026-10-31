import type { Metadata } from "next";

import { ProjectsDirectory } from "@/components/projects/projects-directory";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Infrastructure Geotechnical Projects in Oman",
  description:
    "Explore verified slope protection, rock bolting, shotcrete benches, wire netting drapery, and ditch lining projects across Buraimi, Musandam, Nizwa, and Al Sharqiyah in the Sultanate of Oman.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
        eyebrow="VERIFIED FIELD EXECUTION · SULTANATE OF OMAN"
        title="Geotechnical slope protection and ground engineering across Oman."
        summary="Explore our verified infrastructure packages across mountain highway cuttings, coastal sea-cliffs, and regional water networks—delivered for government authorities and leading Tier-1 EPC contractors."
      />

      {/* 1. INTERACTIVE PROJECTS DIRECTORY */}
      <section className="content-section" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <Container>
          <ProjectsDirectory projects={projects} />
        </Container>
      </section>

      {/* 2. BETTER EXPLANATION: HOW WE SOLVE OMAN'S TERRAIN CHALLENGES */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="ENGINEERING CAPABILITY IN CONTEXT"
            title="How our packages protect Oman's critical infrastructure"
            summary="Geotechnical slope stabilization is not one-size-fits-all. Here is how our specialized disciplines protect different types of civil and utility assets across the Sultanate."
          />

          <div className="projects-context-grid">
            <div className="projects-context-card">
              <div className="projects-context-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19L12 4l8 15H4z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                </svg>
              </div>
              <span className="badge badge--steel" style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }}>
                Highways & Expressways
              </span>
              <h3>Mountain Pass & Road Cuttings</h3>
              <p>
                Blasted mountain highway cuts expose fractured sedimentary and ophiolite rock formations. MEB Geotech constructs stepped shotcrete benches with drainage berms, rock bolts, and concrete ditch lining to permanently arrest slope degradation and prevent rockfalls onto traffic lanes.
              </p>
              <div className="projects-context-card__tag">
                Deployed at: <strong>Al Ubaidah to Fayyad Road & Al Kamil to Sur Expressway</strong>
              </div>
            </div>

            <div className="projects-context-card">
              <div className="projects-context-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20"></path>
                  <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
                  <path d="M4 8l8-5 8 5"></path>
                </svg>
              </div>
              <span className="badge badge--steel" style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }}>
                Extreme Topography
              </span>
              <h3>Vertical Coastal Sea-Cliffs</h3>
              <p>
                In coastal corridors like Musandam, towering limestone cliffs drop directly into the sea or road corridors, offering zero ground access. MEB Geotech mobilizes heavy cranes with suspended work platforms and certified rope-access drilling teams to anchor rock faces and install dynamic rockfall barriers.
              </p>
              <div className="projects-context-card__tag">
                Deployed at: <strong>Khasab to Lima Coastal Road Corridor (Musandam)</strong>
              </div>
            </div>

            <div className="projects-context-card">
              <div className="projects-context-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <span className="badge badge--steel" style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }}>
                Water Security
              </span>
              <h3>Strategic Potable Water Corridors</h3>
              <p>
                Regional water networks run through rugged terrain where excavated pipeline trenches run alongside unstable rocky slopes. We install high-tensile wire mesh drapery pinned with rock bolts and poured bench concrete to protect critical transmission mains against impact and earth movement.
              </p>
              <div className="projects-context-card__tag">
                Deployed at: <strong>Wilayat Manah (Nizwa) & Al Sharqiyah Regional Water Lines</strong>
              </div>
            </div>
          </div>

          {/* 3-Point Quality & Testing Guarantee */}
          <div className="projects-quality-banner">
            <div className="projects-quality-banner__intro">
              <span className="badge badge--verified" style={{ marginBottom: "0.5rem" }}>
                Quality Verification Standard
              </span>
              <h3>Every project is backed by verified geotechnical QA/QC testing.</h3>
              <p>
                We do not just install steel and concrete; our Muscat engineering team subjects every package to rigorous testing before final client sign-off.
              </p>
            </div>

            <div className="projects-quality-banner__grid">
              <div className="quality-point">
                <div className="quality-point__number">01</div>
                <h4>Calibrated Pull-Out Proof Testing</h4>
                <p>
                  Installed rock bolts and ground anchors are verified with calibrated hydraulic hollow-cylinder jacks to confirm holding capacity exceeds design requirements.
                </p>
              </div>

              <div className="quality-point">
                <div className="quality-point__number">02</div>
                <h4>Grout Pressure & Core Testing</h4>
                <p>
                  High-pressure grout logging and continuous core compressive strength tests ensure full encapsulation and zero void spaces in fractured rock.
                </p>
              </div>

              <div className="quality-point">
                <div className="quality-point__number">03</div>
                <h4>Oman Authority Standards</h4>
                <p>
                  Full adherence to Sultanate of Oman Ministry of Transport, Communications & IT (MTCIT) Highway Specifications and NAMA Water Services engineering standards.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Tender & Project Enquiries"
        title="Have a comparable infrastructure site in Oman?"
        summary="Discuss your slope protection, grouting or foundation requirements with our Muscat team. We provide preliminary constructability reviews and detailed method statements."
      />
    </>
  );
}
