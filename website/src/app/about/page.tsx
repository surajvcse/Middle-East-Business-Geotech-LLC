import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { RealLeafletMap } from "@/components/maps/real-leaflet-map";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
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
      "Middle East Business Geotech LLC is a licensed specialist geotechnical engineering contractor based in Muscat, Sultanate of Oman. We are not general builders — our entire organization is dedicated 100% to ground risk, rock mechanics, and specialized sub-surface construction.",
    bulletPoints: [
      "Commercial Registration: CR 1583382 (Muscat, Oman)",
      "Head office & fleet mobilization yard based in South Al Khuwair, Muscat",
      "Full compliance with Oman Ministry & international engineering standards",
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
      "We execute critical ground and rock packages that keep Oman's infrastructure safe: stabilizing steep mountain highways, installing high-capacity ground anchors and rock bolts, spraying structural shotcrete, erecting rockfall mesh, and drilling foundation piles.",
    bulletPoints: [
      "Mountain slope stabilization, high-tensile wire mesh & rockfall barriers",
      "Prestressed ground anchors & high-torque self-drilling rock bolts",
      "Structural wet/dry shotcrete, deep bored piling & pressure grouting",
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
      "We bridge the gap between engineering design concepts and tough ground reality. We work as dedicated specialist subcontractors and package contractors for government authorities, engineering consultants, and tier-1 EPC main contractors.",
    bulletPoints: [
      "Civil Authorities: Ministry of Transport (MTCIT) & NAMA Water Services",
      "Tier-1 EPC Main Contractors: Al Tasnim, Sarooj Construction, Towell Infrastructure",
      "Direct technical collaboration with geotechnical and structural consultants",
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
      "From the steep coastal rock fjords of Musandam to the fractured mountain passes of Al Hajar and deep wadi excavations in Nizwa and Buraimi, our drilling rigs, grouting plants, and certified rope-access slope crews deploy anywhere across Oman.",
    bulletPoints: [
      "Active and completed packages across Musandam, Buraimi, Nizwa & Muscat",
      "Fast nationwide mobilization of specialized crawler drill rigs & slope teams",
      "Proven execution experience in extreme heat, high angles, and remote terrains",
    ],
  },
];

// 2. What We Do in Plain Language
const coreCapabilities = [
  {
    num: "01",
    title: "Mountain Slope Protection & Rockfall Mitigation",
    plainMeaning:
      "Protecting highways, roads, and buildings from falling boulders, crumbling mountain cuttings, and rockslides.",
    howWeDoIt:
      "We drill pattern rock bolts deep into solid rock formations, drape high-tensile steel wire netting across fractured cliff faces, and spray fiber-reinforced structural shotcrete to seal open joints and prevent weather erosion.",
    typicalSites:
      "Highway mountain passes (e.g. Khasab to Lima Road, Al Ubaidah Road), steep wadi cuts, and civil infrastructure platforms.",
  },
  {
    num: "02",
    title: "Ground Anchors & High-Capacity Rock Bolting",
    plainMeaning:
      "Tying back and firmly anchoring unstable rock masses, hillsides, or retaining walls deep into solid bedrock.",
    howWeDoIt:
      "Hydraulic rotary crawler rigs drill deep boreholes into stable rock strata. High-grade multi-strand steel tendon cables or solid steel bars are inserted, pressure-grouted with calibrated cement, and tensioned tight using calibrated hydraulic jacks.",
    typicalSites:
      "Deep highway rock cuts, bridge abutment reinforcements, water reservoir embankments, and deep construction pit retention walls.",
  },
  {
    num: "03",
    title: "Deep Piling & Excavation Earth Retention",
    plainMeaning:
      "Building underground concrete columns and wall barriers to hold back earth and support heavy civil structures.",
    howWeDoIt:
      "We install continuous secant pile walls to block groundwater and soil collapse, construct bored cast-in-place foundation piles, and install rock micropiles where standard large machinery cannot access.",
    typicalSites:
      "Deep pumping stations, water treatment facility shafts, bridge foundations, and building basement excavations.",
  },
  {
    num: "04",
    title: "Soil Improvement & Water Infiltration Grouting",
    plainMeaning:
      "Injecting specialized cement grout into weak, loose soil or cracked rock to make the ground strong, solid, and watertight.",
    howWeDoIt:
      "We inject cementitious or chemical grouts under high pressure through drilled sleeves (TAM / Tube à Manchette) or fissure pipes, consolidating loose ground into a solid, impermeable barrier.",
    typicalSites:
      "Dam foundation cut-offs, water transmission pipeline trenches, wadi riverbed stabilization, and underground seepage control.",
  },
];

// 3. Our 4-Stage Systematic Engineering Process
const deliveryProcess = [
  {
    step: "01",
    title: "Ground Risk & Borehole Review",
    desc: "We analyze site borehole logs, geological discontinuity mapping, and terrain access with project consultants to identify rockfall and ground failure risks before mobilization.",
  },
  {
    step: "02",
    title: "Method Engineering & Plant Selection",
    desc: "We select the exact drilling rigs, anchor tendon capacities, shotcrete mix specifications, and high-angle safety rigging tailored specifically to your site geology.",
  },
  {
    step: "03",
    title: "Controlled On-Site Execution",
    desc: "Our crawler drill rigs, calibrated grouting plants, and certified rope-access technicians install all ground elements under strict daily QA/QC supervision and safety protocols.",
  },
  {
    step: "04",
    title: "Proof Testing & Certified Sign-Off",
    desc: "Every anchor undergoes calibrated pull-out load testing. Shotcrete cores are tested for compressive strength, and complete certified QA/QC handover dossiers are provided for consultant approval.",
  },
];

// 4. Why Leading Contractors Choose MEB Geotech
const whyChooseUs = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Specialist Heavy Fleet",
    desc: "Tracked hydraulic drilling rigs, crane-suspended work platforms, and calibrated grouting plants purpose-built for Oman's tough rock formations.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Certified Rope-Access Crews",
    desc: "Trained rope-access technicians certified for high-angle drilling, scaling, and netting on near-vertical mountain cliffs where cranes cannot reach.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "100% In-House QA/QC Verification",
    desc: "Calibrated hydraulic jacks for anchor pull-out proof testing and core compressive test records that pass consultant audits on first review.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Direct Muscat Engineering Response",
    desc: "Direct communication with our Muscat technical management. We provide prompt tender reviews, constructability advice, and realistic proposals within 24h.",
  },
];

// 5. Core Values & Standards
const standards = [
  {
    num: "01",
    title: "Engineering Integrity",
    desc: "Honest technical decisions strictly grounded in sound geotechnical principles. We recommend constructible methods designed for longevity rather than shortcuts.",
  },
  {
    num: "02",
    title: "Safety on Vertical Faces",
    desc: "Certified rope-access gear, dual-line safety setups, daily harness inspections, and strict stop-work authority on steep rock cuttings.",
  },
  {
    num: "03",
    title: "Environmental Care",
    desc: "Rigorous containment of cement grout runoff to protect Oman’s sensitive wadis, natural water tables, and fragile desert terrain.",
  },
  {
    num: "04",
    title: "Technical Precision",
    desc: "Calibrated pressure gauges, digital grouting logs, and exact alignment checks on irregular mountain rock faces to meet ministry specs.",
  },
  {
    num: "05",
    title: "Accountable Delivery",
    desc: "Transparent daily site reporting, reliable milestone tracking, and collaborative problem-solving with main EPC contractors and consultants.",
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

          <div className="about-pillars-grid">
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
          </div>

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

          <div className="about-cap-grid">
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
          </div>

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
              Interactive real map network of our deployed infrastructure packages and central Muscat headquarters. Toggle between cartographic road map and satellite geological views to inspect project terrains.
            </p>
          </div>

          <RealLeafletMap mode="network" height="520px" showSidebar={true} />
        </Container>
      </section>

      {/* 5. SYSTEMATIC 4-STAGE DELIVERY WORKFLOW */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="SYSTEMATIC WORKFLOW"
            title="How we execute every project from first review to certified sign-off."
            summary="A disciplined, transparent 4-stage engineering model that ensures safety, precision, and zero delays on site."
          />

          <div className="about-process-grid">
            {deliveryProcess.map((proc) => (
              <div key={proc.step} className="about-process-card">
                <span className="about-process-card__step">{proc.step}</span>
                <h3 className="about-process-card__title">{proc.title}</h3>
                <p className="about-process-card__desc">{proc.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. WHY LEADING CLIENTS TRUST US */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="THE MEB GEOTECH ADVANTAGE"
            title="Why leading consultants and EPC contractors choose us."
            summary="Four concrete operational strengths that set our specialized ground execution apart."
          />

          <div className="about-why-grid">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="about-why-card">
                <div className="about-why-card__icon">{item.icon}</div>
                <h3 className="about-why-card__title">{item.title}</h3>
                <p className="about-why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. OPERATIONAL STANDARDS & COMMITMENTS */}
      <section className="values-band">
        <Container>
          <p className="eyebrow" style={{ color: "var(--steel-light)" }}>OPERATIONAL STANDARDS</p>
          <h2>Engineering integrity, technical precision and safe site execution.</h2>
          <p className="values-band__lead">
            Slope protection and underground construction involve inherent operational hazards. We mandate
            systematic risk assessments, task-specific method statements, calibrated safety equipment, and continuous
            ground monitoring on every project in Oman.
          </p>

          <ul className="values-band__grid">
            {standards.map((val) => (
              <li key={val.num} className="values-band__item">
                <span className="values-band__item-num">{val.num} · STANDARD</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </li>
            ))}
          </ul>

          <div className="values-band__note">
            All methods are planned and executed to relevant Oman ministry specifications (MTCIT / NAMA) and international geotechnical engineering standards (BS / ASTM / Eurocode).
          </div>
        </Container>
      </section>

      {/* 8. FINAL CONSULTATION CTA */}
      <ContactCta
        eyebrow="PROJECT CONSULTATION"
        title="Discuss your ground conditions and infrastructure requirements."
        summary="Share your project drawings, borehole data or tender scope with our Muscat technical team for a constructability review and qualified proposal."
      />
    </>
  );
}
