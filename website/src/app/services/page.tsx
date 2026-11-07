import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesDirectory } from "@/components/services/services-directory";
import { Container } from "@/components/ui/container";
import { ScrollStackedCardGrid } from "@/components/ui/scroll-stacked-card-grid";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Specialist Geotechnical Services in Oman | MEB Geotech",
  description:
    "Explore our 8 specialist geotechnical disciplines across Oman: slope stabilisation, rock bolting, shotcrete, rockfall barriers, grouting, deep piling, tunnelling, and rehabilitation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        eyebrow="SPECIALIST GEOTECHNICAL DISCIPLINES · SULTANATE OF OMAN"
        title="Engineered geotechnical methods tailored to Oman's ground conditions."
        summary="From rock bolting and high-pressure shotcrete to jet grouting, deep bored piling, and underground works—our specialist engineering and site execution keep critical infrastructure safe across Oman."
      />

      {/* 1. INTERACTIVE SERVICES DIRECTORY */}
      <section className="content-section" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <Container>
          <ServicesDirectory services={services} />
        </Container>
      </section>

      {/* 2. 4-STAGE METHOD SELECTION WORKFLOW */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflowX: "clip" }}>
        <Container>
          <SectionHeading
            eyebrow="METHOD SELECTION & EXECUTION"
            title="How we determine and deliver the right geotechnical solution"
            summary="Ground engineering in Oman requires careful geological analysis and proven site testing. Here is our systematic 4-stage engineering delivery process."
          />

          <ScrollStackedCardGrid className="services-workflow-grid">
            <div className="services-workflow-card">
              <div className="services-workflow-card__step">01</div>
              <h3>Geological Review & Rock Mapping</h3>
              <p>
                Our engineering geologists study rock formations, bedding planes, cracks, and borehole data to understand how the ground behaves before bringing equipment to the site.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Rock Stability Assessment
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">02</div>
              <h3>Method Engineering & Calculation</h3>
              <p>
                We calculate required anchor lengths, pull capacities, shotcrete mixes, and drainage spacing, preparing clear shop drawings aligned with consultant requirements.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Approved Method Statement & Drawings
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">03</div>
              <h3>Equipment Mobilization & Setup</h3>
              <p>
                We mobilize tracked crawler drill rigs, suspended work platforms, or grouting plants with certified rope-access drillers experienced in Oman&apos;s mountain terrain.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Safe & Controlled Site Execution
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">04</div>
              <h3>Field Proof Testing & Certified Handover</h3>
              <p>
                Every installed ground anchor is tested with calibrated hydraulic jacks to exceed design loads. Grout pressure logs and core tests verify long-term quality.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Certified QA/QC Handover Records
              </div>
            </div>
          </ScrollStackedCardGrid>
        </Container>
      </section>

      {/* 3. SPECIALIST PLANT & EQUIPMENT FLEET */}
      <section className="content-section" style={{ overflowX: "clip" }}>
        <Container>
          <SectionHeading
            eyebrow="FIELD READINESS & PLANT FLEET"
            title="Specialist equipment deployed on Oman infrastructure"
            summary="Geotechnical engineering in Oman's mountain passes and coastal cliffs requires purpose-built machinery. Our Muscat equipment yard maintains high-angle and deep-drilling equipment ready for nationwide mobilization."
          />

          <ScrollStackedCardGrid className="services-plant-grid">
            <div className="services-plant-card">
              <div className="services-plant-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h4>Tracked Hydraulic Crawler Rigs</h4>
              <p>
                High-torque rotary percussive drill rigs that can move across steep mountain benches and rough terrain to install pattern rock bolts.
              </p>
              <span className="plant-tag">Drilling & Rock Bolting</span>
            </div>

            <div className="services-plant-card">
              <div className="services-plant-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h4>Crane-Suspended Work Platforms</h4>
              <p>
                Heavy crane-supported work baskets built for vertical sea-cliffs and high rock cuttings where ground machines cannot reach.
              </p>
              <span className="plant-tag">Musandam Sea-Cliffs & High Cuts</span>
            </div>

            <div className="services-plant-card">
              <div className="services-plant-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h4>Automated Grout Mixing & Injection Plants</h4>
              <p>
                High-pressure colloidal grout mixers and pumps with electronic pressure gauges to fill voids, seal cracks, and secure ground anchors.
              </p>
              <span className="plant-tag">Pressure Grouting & Anchors</span>
            </div>

            <div className="services-plant-card">
              <div className="services-plant-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h4>Calibrated Hydraulic Proof Jacks</h4>
              <p>
                Hydraulic jacks with certified pressure gauges to test every batch of ground anchors up to 150% of design load on site.
              </p>
              <span className="plant-tag">Certified QA/QC Verification</span>
            </div>
          </ScrollStackedCardGrid>
        </Container>
      </section>

      <ContactCta
        eyebrow="Technical Consultation"
        title="Need guidance on choosing the right method for your site in Oman?"
        summary="Speak with our geotechnical engineers in Muscat. We evaluate your borehole reports, rock conditions, and site access to recommend the most cost-effective and safe geotechnical solution."
      />
    </>
  );
}
