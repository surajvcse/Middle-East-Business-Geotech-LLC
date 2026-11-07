import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { OperationalStandardsAnimated } from "@/components/sections/operational-standards-animated";
import { SectionHeading } from "@/components/sections/section-heading";
import { RealLeafletMap } from "@/components/maps/real-leaflet-map";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { CubertoCardSpread } from "@/components/ui/cuberto-card-spread";
import { ScrollStackedCardGrid } from "@/components/ui/scroll-stacked-card-grid";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "About Us | Specialist Geotechnical Contractor Oman",
  description:
    "Learn about Middle East Business Geotech LLC: licensed specialist geotechnical engineering contractor in Muscat, Oman (CR 1583382). Discover what we do, our specialist fleet, and our proven slope and ground solutions.",
};

// 1. Core Pillars: What We Are at a Glance
const corePillars = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    badge: "Muscat Headquartered · CR 1583382",
    title: "Who We Are",
    description:
      "Middle East Business Geotech LLC is a licensed geotechnical contractor based in Muscat, Oman. We focus 100% on ground engineering, rock mechanics, and specialized sub-surface construction.",
    bulletPoints: [
      "Commercial Registration: CR 1583382 (Muscat, Oman)",
      "Head office and equipment yard based in South Al Khuwair, Muscat",
      "Full compliance with Oman ministry and international engineering standards",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    badge: "Specialist Field Scope",
    title: "What We Do on Site",
    description:
      "We protect mountain roads, install rock bolts and ground anchors, spray structural shotcrete, install rockfall mesh, drill foundation piles, and strengthen weak ground across Oman.",
    bulletPoints: [
      "Slope stabilization, high-strength wire mesh & rockfall catch barriers",
      "Prestressed ground anchors & self-drilling rock bolts",
      "Structural wet and dry shotcrete, bored piling & pressure grouting",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    badge: "Trusted Engineering Partners",
    title: "Who We Work With",
    description:
      "We work as dedicated specialist subcontractors for government authorities, engineering consultants, and leading EPC main contractors across Oman.",
    bulletPoints: [
      "Government Authorities: Ministry of Transport (MTCIT) & NAMA Water Services",
      "Leading Main Contractors: Al Tasnim, Sarooj Construction, Towell Infrastructure",
      "Direct technical coordination with geotechnical and structural consultants",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    badge: "Sultanate-Wide Reach",
    title: "Where We Operate",
    description:
      "From the coastal sea-cliffs of Musandam to the mountain passes of Al Hajar and wadi excavations in Nizwa and Buraimi, our drilling rigs and slope crews deploy anywhere across Oman.",
    bulletPoints: [
      "Completed and active packages in Musandam, Buraimi, Nizwa, Al Sharqiyah, and Muscat",
      "Fast nationwide mobilization of crawler drill rigs and specialized slope teams",
      "Proven experience working in high desert heat, remote terrain, and vertical cliffs",
    ],
  },
];

// 2. What We Do in Plain Language
const coreCapabilities = [
  {
    num: "01",
    title: "Mountain Slope Protection & Rockfall Safety",
    plainMeaning:
      "Stopping rockfalls, landslides, and crumbling slopes to protect roads, pipelines, and buildings.",
    howWeDoIt:
      "We drill strong steel rock bolts deep into solid rock, drape high-strength steel wire mesh across steep faces, and spray shotcrete to prevent erosion.",
    typicalSites:
      "Mountain road cuts (e.g. Khasab to Lima Road, Al Ubaidah Road), steep wadi banks, and building platforms.",
  },
  {
    num: "02",
    title: "Ground Anchors & High-Capacity Rock Bolting",
    plainMeaning:
      "Holding back unstable rock walls, hillsides, and deep excavation pits by anchoring them deep into solid bedrock.",
    howWeDoIt:
      "Hydraulic crawler rigs drill deep holes into stable rock. Steel tendon cables or solid steel bars are inserted, pressure-grouted with cement, and pulled tight with calibrated hydraulic jacks.",
    typicalSites:
      "Deep highway cuttings, bridge abutments, water reservoir embankments, and deep building basement walls.",
  },
  {
    num: "03",
    title: "Deep Piling & Excavation Shoring",
    plainMeaning:
      "Building underground concrete walls and foundation columns to support heavy structures and keep deep excavation pits safe.",
    howWeDoIt:
      "We drill contiguous and secant pile walls to block soil and groundwater, construct cast-in-place foundation piles, and install rock micropiles in tight spaces.",
    typicalSites:
      "Deep pump stations, water treatment shafts, highway bridges, and multi-level basement excavations.",
  },
  {
    num: "04",
    title: "Soil Improvement & Pressure Grouting",
    plainMeaning:
      "Injecting cement grout into loose soil or cracked rock to make the ground strong, solid, and watertight.",
    howWeDoIt:
      "We pump cement or chemical grout under controlled pressure through drilled injection pipes (TAM), filling cracks and voids to create a solid, water-tight barrier.",
    typicalSites:
      "Dam foundations, water pipeline trenches, riverbed wadi stabilization, and underground water leak sealing.",
  },
];

// 3. Our 4-Stage Systematic Engineering Process
const deliveryProcess = [
  {
    step: "01",
    title: "Ground Risk & Borehole Review",
    desc: "We study soil reports, borehole logs, and site access with project consultants to identify risks before mobilization.",
  },
  {
    step: "02",
    title: "Method Engineering & Plant Selection",
    desc: "We choose the exact drilling rigs, calculate anchor capacities, and prepare method statements tailored to your site geology.",
  },
  {
    step: "03",
    title: "Controlled On-Site Execution",
    desc: "Our crawler drill rigs, grouting plants, and rope-access technicians install all ground elements under daily quality control and strict safety rules.",
  },
  {
    step: "04",
    title: "Proof Testing & Certified Sign-Off",
    desc: "Every anchor is pull-tested with calibrated hydraulic jacks. Shotcrete is tested for strength, and certified quality dossiers are submitted for consultant sign-off.",
  },
];

// 4. Why Leading Contractors Choose MEB Geotech
const whyChooseUs = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Specialist Heavy Fleet",
    desc: "Tracked hydraulic drill rigs, crane-suspended work platforms, and grouting plants purpose-built for Oman's tough rock formations.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Certified Rope-Access Crews",
    desc: "Trained technicians certified for high-angle drilling, rock scaling, and netting on vertical cliffs where cranes cannot reach.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "100% In-House Quality Testing",
    desc: "Calibrated hydraulic jacks for anchor pull testing and concrete core tests that pass consultant audits on first review.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Direct Muscat Engineering Support",
    desc: "Speak directly with our Muscat engineering management for fast tender reviews, constructability advice, and clear proposals.",
  },
];

// 5. Core Values & Standards
const standards = [
  {
    num: "01",
    title: "Engineering Integrity",
    desc: "Honest technical recommendations based on sound geotechnical principles and long-term durability rather than shortcuts.",
  },
  {
    num: "02",
    title: "Safety on Vertical Faces",
    desc: "Certified rope-access gear, dual-rope safety systems, daily harness checks, and strict safety rules on steep mountain slopes.",
  },
  {
    num: "03",
    title: "Environmental Care",
    desc: "Clean containment of cement grout to protect Oman’s natural wadis, groundwater, and desert environment.",
  },
  {
    num: "04",
    title: "Technical Precision",
    desc: "Calibrated pressure gauges, digital grouting logs, and exact alignment checks to meet Oman ministry standards.",
  },
  {
    num: "05",
    title: "Accountable Delivery",
    desc: "Clear daily site reports, reliable schedule tracking, and close teamwork with main contractors and consultants.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        eyebrow="WHO WE ARE · SULTANATE OF OMAN"
        title="Specialist Geotechnical Engineering & Ground Construction Contractor."
        summary="Headquartered in Muscat (CR 1583382), Middle East Business Geotech LLC delivers turnkey ground engineering across the Sultanate. We secure steep mountain highway slopes, install high-capacity rock bolts & ground anchors, spray structural shotcrete, drill deep foundation piles, and improve weak ground for road, water, and civil infrastructure."
        actions={
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <ButtonLink href="/services" variant="primary">
              Explore specialist services
            </ButtonLink>
            <ButtonLink href="/projects" variant="steel">
              Review Oman project evidence
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Muscat engineering office
            </ButtonLink>
          </div>
        }
      />

      {/* 2. AT A GLANCE: 4 CORE PILLARS */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="AT A GLANCE"
            title="An exact, clear overview of who we are and what we deliver."
            summary="A simple, structured snapshot answering the four most important questions about our business."
          />

          <CubertoCardSpread
            className="about-pillars-grid"
            triggerStart={0.96}
            triggerEnd={0.16}
            rotations={[-7.5, 6.0, -4.5, 8.0]}
            scatters={[
              { x: -18, y: -12 },
              { x: 16, y: -8 },
              { x: -12, y: 14 },
              { x: 18, y: 10 },
            ]}
          >
            {corePillars.map((pillar) => (
              <div key={pillar.title} className="about-pillar-card">
                <div className="about-pillar-card__header">
                  <div className="about-pillar-card__icon">{pillar.icon}</div>
                  <span className="badge badge--steel">{pillar.badge}</span>
                </div>
                <h3 className="about-pillar-card__title">{pillar.title}</h3>
                <p className="about-pillar-card__desc">{pillar.description}</p>
                <ul className="about-pillar-card__list">
                  {pillar.bulletPoints.map((point) => (
                    <li key={point} className="about-pillar-card__list-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CubertoCardSpread>

          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.25rem 1.75rem",
              background: "var(--canvas)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: "0.9375rem", color: "var(--navy-deep)", fontWeight: 650 }}>
                Official Commercial Registration: CR {company.crNumber} · Registered in Muscat, Sultanate of Oman
              </span>
            </div>
            <span style={{ fontSize: "0.875rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
              MoCI Grade 1 Geotechnical Compliance
            </span>
          </div>
        </Container>
      </section>

      {/* 3. CORE FIELD CAPABILITIES EXPLAINED IN SIMPLE LANGUAGE */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="FIELD EXPERTISE"
            title="Our specialist ground capabilities explained in plain, practical terms."
            summary="What each geotechnical service means for your project, how our crews execute it on site, and where it is applied in Oman."
          />

          <CubertoCardSpread
            className="about-cap-grid"
            triggerStart={0.96}
            triggerEnd={0.16}
            rotations={[-7.0, 6.5, -5.0, 8.5]}
            scatters={[
              { x: -16, y: -14 },
              { x: 18, y: -10 },
              { x: -14, y: 16 },
              { x: 20, y: 12 },
            ]}
          >
            {coreCapabilities.map((cap) => (
              <div key={cap.num} className="about-cap-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="about-cap-card__num">{cap.num} · SPECIALIST DISCIPLINE</span>
                  <span className="badge badge--steel">Field Execution</span>
                </div>

                <h3 className="about-cap-card__title">{cap.title}</h3>

                <div className="about-cap-card__block">
                  <span className="about-cap-card__block-label"></span>
                  <p className="about-cap-card__block-text">{cap.plainMeaning}</p>
                </div>

                <div className="about-cap-card__block">
                  <span className="about-cap-card__block-label">How We Execute It On Site</span>
                  <p className="about-cap-card__block-text">{cap.howWeDoIt}</p>
                </div>

                <div className="about-cap-card__block" style={{ borderTop: "1px dashed var(--border)", paddingTop: "0.75rem" }}>
                  <span className="about-cap-card__block-label">Typical Sites in Oman</span>
                  <p className="about-cap-card__block-text" style={{ color: "var(--navy-deep)", fontWeight: 550 }}>
                    {cap.typicalSites}
                  </p>
                </div>
              </div>
            ))}
          </CubertoCardSpread>

          <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <ButtonLink href="/services" variant="primary">
              View all 8 technical services & method specifications →
            </ButtonLink>
            <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
              Includes technical specifications, drilling plant details and engineering standards
            </span>
          </div>
        </Container>
      </section>

      {/* 4. SULTANATE OPERATIONS & REAL CARTOGRAPHIC MAP */}
      <section className="content-section content-section--soft">
        <Container>
          <div style={{ marginBottom: "2rem" }}>
            <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
              Geographic Coverage · Sultanate of Oman
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", color: "var(--navy-deep)", margin: "0.35rem 0 0.5rem", letterSpacing: "-0.01em" }}>
              Strategic Geotechnical Operations Across Oman
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "68ch", margin: 0, fontSize: "0.975rem", lineHeight: 1.6 }}>
              Interactive map showing our project locations and central Muscat headquarters. Switch between road and satellite views to explore project sites.
            </p>
          </div>

          <RealLeafletMap mode="network" height="520px" showSidebar={true} />
        </Container>
      </section>

      {/* 5. SYSTEMATIC 4-STAGE DELIVERY WORKFLOW */}
      <section className="content-section" style={{ overflowX: "clip" }}>
        <Container>
          <SectionHeading
            eyebrow="SYSTEMATIC WORKFLOW"
            title="How we deliver every project from first review to certified sign-off."
            summary="A disciplined, transparent 4-stage engineering process that ensures safety, precision, and zero delays on site."
          />

          <ScrollStackedCardGrid className="about-process-grid">
            {deliveryProcess.map((proc) => (
              <div key={proc.step} className="about-process-card">
                <span className="about-process-card__step">{proc.step}</span>
                <h3 className="about-process-card__title">{proc.title}</h3>
                <p className="about-process-card__desc">{proc.desc}</p>
              </div>
            ))}
          </ScrollStackedCardGrid>
        </Container>
      </section>

      {/* 6. WHY LEADING CLIENTS TRUST US */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)", overflowX: "clip" }}>
        <Container>
          <SectionHeading
            eyebrow="THE MEB GEOTECH ADVANTAGE"
            title="Why leading consultants and main contractors choose us."
            summary="Four practical operational strengths that set our specialized ground execution apart."
          />

          <ScrollStackedCardGrid className="about-why-grid">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="about-why-card">
                <div className="about-why-card__icon">{item.icon}</div>
                <h3 className="about-why-card__title">{item.title}</h3>
                <p className="about-why-card__desc">{item.desc}</p>
              </div>
            ))}
          </ScrollStackedCardGrid>
        </Container>
      </section>

      {/* 7. OPERATIONAL STANDARDS & COMMITMENTS */}
      <OperationalStandardsAnimated
        eyebrow="OPERATIONAL STANDARDS"
        heading={<h2>Engineering integrity, technical precision and safe site execution.</h2>}
        lead="Slope protection and underground works require careful safety planning. We follow detailed safety method statements, use calibrated equipment, and maintain active ground monitoring on every project in Oman."
        standards={standards.map((s) => ({ ...s, badgeSuffix: "· STANDARD" }))}
        note="All methods follow Oman ministry specifications and international geotechnical engineering standards."
      />

      {/* 8. FINAL CONSULTATION CTA */}
      <ContactCta
        eyebrow="PROJECT CONSULTATION"
        title="Discuss your ground conditions and project requirements."
        summary="Share your project drawings, borehole data, or tender documents with our Muscat engineering team for a constructability review and clear proposal."
      />
    </>
  );
}
