import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesDirectory } from "@/components/services/services-directory";
import { Container } from "@/components/ui/container";
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
        summary="From active rock bolting and high-pressure shotcrete to jet grouting, deep bored piling, and underground works—our specialist design and execution capabilities protect critical infrastructure across the Sultanate of Oman."
      />

      {/* 1. INTERACTIVE SERVICES DIRECTORY */}
      <section className="content-section" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <Container>
          <ServicesDirectory services={services} />
        </Container>
      </section>

      {/* 2. 4-STAGE METHOD SELECTION WORKFLOW */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="METHOD SELECTION & EXECUTION"
            title="How we determine and deliver the right geotechnical solution"
            summary="Ground engineering in Oman requires strict geological correlation and rigorous field proofing. Here is our systematic 4-stage engineering delivery workflow."
          />

          <div className="services-workflow-grid">
            <div className="services-workflow-card">
              <div className="services-workflow-card__step">01</div>
              <h3>Geological Mapping & Discontinuity Survey</h3>
              <p>
                Our engineering geologists examine rock mass ratings (RMR/Q-system), bedding planes, joint orientations, and borehole stratigraphy to identify true failure mechanisms before equipment mobilization.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Kinematic Stability Assessment
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">02</div>
              <h3>Engineered Design & Method Statement</h3>
              <p>
                We develop constructible engineering packages—calculating required anchor bond lengths, tension capacities, shotcrete mix designs, and weep-hole spacing in full alignment with client consultants.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Approved Method Statement & Shop Drawings
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">03</div>
              <h3>Specialist Rig Mobilization & Rigging</h3>
              <p>
                Deploying tracked crawler drill rigs, crane-suspended work platforms, or high-pressure grout plants with certified rope-access drillers and equipment operators experienced in extreme Oman topography.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> Safe Controlled Field Execution
              </div>
            </div>

            <div className="services-workflow-card">
              <div className="services-workflow-card__step">04</div>
              <h3>Field Proof Testing & Certified Sign-off</h3>
              <p>
                Every installed ground anchor is tested with calibrated hydraulic hollow-cylinder jacks to exceed design tensile load. Continuous grout pressure logs and core compressive tests verify structural integrity.
              </p>
              <div className="services-workflow-card__footer">
                <span>Output:</span> QA/QC Certified Handover Record
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. SPECIALIST PLANT & EQUIPMENT FLEET */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="FIELD READINESS & PLANT FLEET"
            title="Specialist equipment deployed on Oman infrastructure"
            summary="Geotechnical engineering in Oman's mountain passes and coastal cliffs demands specialized machinery. Our Muscat operations yard maintains high-angle and deep-drilling equipment."
          />

          <div className="services-plant-grid">
            <div className="services-plant-card">
              <div className="services-plant-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h4>Tracked Hydraulic Crawler Rigs</h4>
              <p>
                High-torque rotary percussive and DTH drill rigs capable of traversing steep berms and uneven rock benches for pattern anchor installations.
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
                Heavy crane-suspended man-baskets engineered for vertical sea-cliffs and rockfall barrier installations where ground machinery cannot stand.
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
                High-pressure colloidal grout mixers and progressive cavity pumps with electronic flowmeter and pressure recording for karst permeation and anchor encapsulation.
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
                Hollow-cylinder hydraulic jacks with certified pressure gauges to conduct in-situ pull-out proof testing up to 150% of design load on every anchor batch.
              </p>
              <span className="plant-tag">Certified QA/QC Verification</span>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Technical Consultation"
        title="Need guidance on method selection for your site in Oman?"
        summary="Speak with our geotechnical engineers in Muscat. We evaluate site borehole data, rock mass ratings, and logistical constraints to recommend the most cost-effective and safe geotechnical methodology."
      />
    </>
  );
}
