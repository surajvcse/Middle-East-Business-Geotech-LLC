import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { RealLeafletMap } from "@/components/maps/real-leaflet-map";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Middle East Business Geotech LLC: specialist geotechnical design and execution contractor headquartered in Muscat, Sultanate of Oman.",
};

const values = [
  {
    num: "01",
    title: "Engineering Integrity",
    description:
      "Technical decisions remain strictly grounded in sound geotechnical principles, geological evidence and site-specific risk evaluation. We recommend methods designed for longevity rather than shortcuts.",
  },
  {
    num: "02",
    title: "Technical Precision",
    description:
      "Disciplined execution, calibrated drilling and grouting plant, and accurate alignment on steep or irregular geological faces. Quality control checks ensure every installed element meets specification.",
  },
  {
    num: "03",
    title: "Safety & Well-Being",
    description:
      "Personnel operating on near-vertical rock faces, suspended platforms and confined excavations require clear safety procedures, certified rope-access gear and the authority to halt unsafe work.",
  },
  {
    num: "04",
    title: "Environmental Responsibility",
    description:
      "Site methods prioritize containment of grout, controlled drainage runoff, responsible spoil management and minimal footprint disturbance across Oman's natural landscapes and wadis.",
  },
  {
    num: "05",
    title: "Long-Term Partnership",
    description:
      "Reliable delivery, transparent reporting and collaborative problem-solving form the bedrock of lasting relationships with government authorities, consultants and main EPC contractors.",
  },
];

const capabilitiesBreakdown = [
  {
    title: "Slope Protection & Stabilisation",
    description:
      "Mitigating rockfall hazards, translational failures and erosion along mountain transport corridors and civil construction cuttings using prestressed cable anchors, pattern rock bolting, shotcrete and high-tensile wire mesh drapery.",
  },
  {
    title: "Ground Improvement & Permeation",
    description:
      "Enhancing the mechanical properties of permeable, weak or voided sub-surface strata using high-pressure jet grouting, TAM grouting, fissure permeation and water cut-off barriers.",
  },
  {
    title: "Piling & Deep Earth Retention",
    description:
      "Constructing rigid excavation retention systems and deep foundations through secant and contiguous bored piles, micropiling in rock, soldier piles with lagging, and diaphragm wall systems.",
  },
  {
    title: "Underground & Specialist Civil Works",
    description:
      "Executing sequential tunnelling (NATM), shaft sinking, microtunnelling utility crossings, pipe roofing, and rehabilitation of existing tunnels, dams and highway infrastructure.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        eyebrow="COMPANY PROFILE"
        title="Specialist geotechnical capability built around real ground conditions."
        summary="Middle East Business Geotech LLC provides specialist design and execution solutions for slope protection, ground improvement, foundations and underground works across the Sultanate of Oman."
        actions={
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <ButtonLink href="/contact" variant="primary">
              Contact our Muscat office
            </ButtonLink>
            <ButtonLink href="/projects" variant="steel">
              Review project records
            </ButtonLink>
          </div>
        }
      />

      {/* 1. COMPANY OVERVIEW & ROLE */}
      <section className="content-section">
        <Container className="two-column-editorial">
          <SectionHeading
            eyebrow="OUR ROLE"
            title="A dedicated geotechnical partner for consultants and main contractors."
          />
          <div>
            <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.65 }}>
              Headquartered in Muscat, Middle East Business Geotech LLC operates as a specialist
              geotechnical contractor. We bridge the critical gap between geotechnical design
              concepts and rigorous, safe site execution in Oman’s challenging terrain.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Oman’s infrastructure development frequently contends with extreme geological
              conditions: steep limestone cliffs in Musandam, fractured mountain passes in Al Hajar,
              deep wadi cuts, and variable coastal sands. Our teams deploy specialized drilling,
              grouting and slope-access equipment suited to these rugged conditions.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              We collaborate with project consultants, civil authorities (such as the Ministry of
              Transport and Communications and NAMA Water Services), and leading EPC main
              contractors to execute geotechnical packages safely, on schedule, and to exact technical
              specifications.
            </p>

            <div className="editorial-stats">
              <div className="stat-item">
                <span className="stat-item__label">Legal Entity</span>
                <span className="stat-item__value">{company.name}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__label">Commercial Registration</span>
                <span className="stat-item__value">CR {company.crNumber}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SULTANATE OPERATIONS & REAL CARTOGRAPHIC MAP */}
      <section className="content-section content-section--soft" style={{ borderTop: "1px solid var(--border)" }}>
        <Container>
          <div style={{ marginBottom: "2rem" }}>
            <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
              Geographic Coverage · Sultanate of Oman
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", color: "var(--navy-deep)", margin: "0.35rem 0 0.5rem", letterSpacing: "-0.01em" }}>
              Strategic Geotechnical Operations Across Oman
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "62ch", margin: 0, fontSize: "0.975rem", lineHeight: 1.6 }}>
              Interactive real map network of our deployed infrastructure packages and central Muscat headquarters. Toggle between cartographic road map and satellite geological views to inspect project terrains.
            </p>
          </div>

          <RealLeafletMap mode="network" height="520px" showSidebar={true} />
        </Container>
      </section>

      {/* 3. CORE CAPABILITY DOMAINS */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="TECHNICAL SCOPE"
            title="Disciplines developed for Oman’s civil and infrastructure projects."
            summary="Our design and execution capability encompasses four core technical areas."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem" }}>
            {capabilitiesBreakdown.map((item, idx) => (
              <div
                key={item.title}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <span className="badge badge--steel" style={{ alignSelf: "flex-start" }}>
                  Discipline 0{idx + 1}
                </span>
                <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--navy-deep)" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.925rem", lineHeight: 1.55, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <ButtonLink href="/services" variant="steel">
              Explore detailed service specifications →
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 3. CORE VALUES & STANDARDS */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="GUIDING PRINCIPLES"
            title="The standards behind every decision on site."
            summary="Geotechnical engineering demands high accountability. Our core values guide how we assess ground risk, protect personnel, and deliver specialist works."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {values.map((val) => (
              <article
                key={val.title}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 750, color: "var(--steel)" }}>
                  {val.num} · STANDARD
                </span>
                <h3 style={{ fontSize: "1.25rem", margin: 0, color: "var(--navy-deep)" }}>
                  {val.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9375rem", lineHeight: 1.55, margin: 0 }}>
                  {val.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. OPERATIONAL SAFETY & COMMITMENTS */}
      <section className="values-band">
        <Container>
          <p className="eyebrow" style={{ color: "var(--steel-light)" }}>SITE COMMITMENT</p>
          <h2>Rigorous safety protocols for high-angle and complex ground operations.</h2>
          <p className="values-band__lead">
            Slope protection and underground construction involve inherent operational hazards. We mandate
            systematic risk assessments, task-specific method statements, calibrated safety equipment, and continuous
            ground monitoring on every project.
          </p>

          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Rope-Access & High Slope Safety
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem", margin: 0 }}>
                Specialized rigging, daily harness inspections, primary and backup anchorage lines for all personnel working on steep rock cuttings.
              </p>
            </div>
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Calibrated Quality Verification
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem", margin: 0 }}>
                Systematic pull-out testing on anchors and rock bolts, compressive strength coring for shotcrete, and grouting pressure logs.
              </p>
            </div>
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Environmental & Runoff Control
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem", margin: 0 }}>
                Careful containment of cementitious runoff in sensitive wadi catchments and strict dust management during shotcreting.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Partner With Us"
        title="Discuss upcoming geotechnical tenders or site challenges."
        summary="Our Muscat technical team is available to review site plans, discuss method suitability, and provide qualified technical proposals."
      />
    </>
  );
}
