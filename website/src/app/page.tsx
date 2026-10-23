import Link from "next/link";

import { HeroProjectSlider } from "@/components/projects/hero-project-slider";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

const capabilityStripItems = [
  {
    num: "01",
    title: "Slope Stabilisation",
    desc: "Cable anchors, rock bolting & shotcrete.",
    href: "/services/slope-stabilisation",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m2 20 10-14 4 6 6-4" />
        <line x1="12" y1="6" x2="12" y2="10" />
        <line x1="16" y1="12" x2="16" y2="16" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Ground Improvement",
    desc: "Jet, TAM & fissure grouting for voided ground.",
    href: "/services/ground-improvement-grouting",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Foundation Engineering",
    desc: "Secant & contiguous piling, shoring.",
    href: "/services/piling-and-foundations",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 22h16" />
        <path d="M6 18V2h12v16" />
        <path d="M6 10h12" />
        <path d="M10 2v16" />
        <path d="M14 2v16" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Underground Works",
    desc: "NATM tunnelling & deep shaft excavation.",
    href: "/services/microtunneling-underground-works",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 20V10a9 9 0 0 1 18 0v10" />
        <path d="M3 20h18" />
        <path d="M7 20v-8a5 5 0 0 1 10 0v8" />
      </svg>
    ),
  },
];

const engineeringApproachSteps = [
  {
    num: "01",
    title: "Assessment & Coordination",
    desc: "Review of site geological data, rock mass characteristics, borehole logs, water ingress and structural constraints in collaboration with project consultants.",
  },
  {
    num: "02",
    title: "Method Selection & Planning",
    desc: "Engineering method selection—from prestressed anchors and rock bolting to jet grouting and piling—matched to ground conditions, access constraints and programme demands.",
  },
  {
    num: "03",
    title: "Controlled Site Execution",
    desc: "Deployment of specialized drilling rigs, rope-access slope crews and calibrated grouting plants under disciplined supervision and strict safety protocols.",
  },
  {
    num: "04",
    title: "Testing & Quality Handover",
    desc: "Systematic quality verification through pull-out testing, anchor load monitoring, shotcrete core tests and complete handover documentation for project sign-off.",
  },
];

const valuesList = [
  {
    num: "01",
    title: "Engineering Integrity",
    desc: "Technical decisions grounded in sound geotechnical judgement and transparent evaluation of ground risks.",
  },
  {
    num: "02",
    title: "Technical Precision",
    desc: "Disciplined execution, calibrated drilling and grouting equipment, and accurate alignment on complex geological faces.",
  },
  {
    num: "03",
    title: "Safety & Well-Being",
    desc: "Uncompromising protocols for personnel operating on vertical slopes, confined excavations and underground structures.",
  },
  {
    num: "04",
    title: "Environmental Responsibility",
    desc: "Controlled spoil handling, grout containment, runoff management and minimal disturbance to adjacent natural terrains.",
  },
  {
    num: "05",
    title: "Long-Term Partnership",
    desc: "Accountable delivery and collaborative problem-solving that establish durable relationships with contractors and authorities.",
  },
];

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero" aria-labelledby="hero-title">
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow">SPECIALIST GEOTECHNICAL ENGINEERING · MUSCAT, OMAN</p>
            <h1 id="hero-title">
              Geotechnical solutions designed for difficult ground and demanding infrastructure.
            </h1>
            <p className="hero__summary">
              Middle East Business Geotech LLC delivers specialist design and execution
              capability across slope protection, ground improvement, foundation engineering
              and underground works in the Sultanate of Oman.
            </p>
            <div className="hero__actions" aria-label="Primary actions">
              <ButtonLink href="/contact" variant="primary">
                Request a consultation
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Explore project records
              </ButtonLink>
            </div>
            <div className="hero__meta" aria-label="Key company parameters">
              <span className="hero__meta-item">
                <span style={{ color: "var(--navy)", fontWeight: 700 }}>CR:</span> {company.crNumber}
              </span>
              <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>|</span>
              <span className="hero__meta-item">
                <span style={{ color: "var(--navy)", fontWeight: 700 }}>HQ:</span> {company.location}
              </span>
              <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>|</span>
              <span className="hero__meta-item">
                <span style={{ color: "var(--navy)", fontWeight: 700 }}>Scope:</span> Design & Execution
              </span>
            </div>
          </div>

          <HeroProjectSlider projects={projects} />
        </Container>
      </section>

      {/* 2. CAPABILITY STRIP */}
      <section className="capability-strip" aria-label="Core geotechnical disciplines">
        <Container>
          <ul className="capability-strip__grid">
            {capabilityStripItems.map((item) => (
              <li key={item.title} className="capability-strip__item">
                <Link href={item.href} className="capability-strip__link">
                  <div className="capability-strip__accent" aria-hidden="true" />
                  <div className="capability-strip__top flex items-center gap-2 min-w-0 w-full">
                    <span className="capability-strip__icon shrink-0">{item.icon}</span>
                    <span className="capability-strip__num shrink-0">{item.num}</span>
                    <h3 className="capability-strip__title truncate">{item.title}</h3>
                    <svg
                      className="capability-strip__arrow shrink-0 ml-auto"
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                    </svg>
                  </div>
                  <p className="capability-strip__desc truncate">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. COMPANY INTRODUCTION */}
      <section className="content-section">
        <Container className="two-column-editorial">
          <div>
            <SectionHeading
              eyebrow="SPECIALIST CONTRACTOR ROLE"
              title="Design and execution capability built around Oman’s demanding geology."
            />
            <div className="editorial-capability-card">
              <div className="editorial-capability-card__header">
                <span className="badge badge--steel">Specialist Discipline Scope</span>
                <span>CR 1583382 · MUSCAT</span>
              </div>
              <ul className="editorial-capability-items">
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__num" aria-hidden="true">
                    01
                  </div>
                  <div className="editorial-capability-item__body">
                    <h4>Design & Build Integration</h4>
                    <p>
                      Direct translation of borehole logs, joint discontinuity surveys and rock mechanics into constructible site packages.
                    </p>
                  </div>
                </li>
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__num" aria-hidden="true">
                    02
                  </div>
                  <div className="editorial-capability-item__body">
                    <h4>High-Angle Rigging & Specialist Plant</h4>
                    <p>
                      Crane-suspended work platforms, tracked drilling rigs and certified rope-access crews on steep mountain cuttings.
                    </p>
                  </div>
                </li>
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__num" aria-hidden="true">
                    03
                  </div>
                  <div className="editorial-capability-item__body">
                    <h4>Systematic Quality Verification</h4>
                    <p>
                      Proof pull-out testing on anchors, compressive strength coring on shotcrete, and continuous pressure grouting logs.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="editorial-capability-card__footer">
                <span>Verified Regional Deployments in Oman:</span>
                <div className="governorate-pills">
                  <span className="badge">Musandam</span>
                  <span className="badge">Buraimi</span>
                  <span className="badge">Nizwa</span>
                  <span className="badge">Al Sharqiyah</span>
                  <span className="badge">Muscat (HQ)</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "1.08rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Middle East Business Geotech LLC supports infrastructure owners, consulting engineers
              and main EPC contractors with practical geotechnical solutions tailored to the
              ground conditions, site access constraints, and programme demands of each site.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              From mountain corridors in Musandam and Buraimi to regional water pipeline trenches
              and expressway rock cuts in Al Sharqiyah, our specialist teams bring together pattern
              anchoring, high-pressure grouting, shotcreting, deep piling and underground excavation
              methods to safely manage ground risks.
            </p>

            <div className="editorial-stats">
              <div className="stat-item">
                <span className="stat-item__label">Headquarters</span>
                <span className="stat-item__value">Muscat, Sultanate of Oman</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__label">Operational Focus</span>
                <span className="stat-item__value">Road, Water & Civil Infrastructure</span>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <ButtonLink href="/about" variant="steel">
                About our engineering background
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. CORE SERVICES */}
      <section className="content-section content-section--soft">
        <Container>
          <SectionHeading
            eyebrow="CORE GEOTECHNICAL DISCIPLINES"
            title="Specialist methods selected around site ground conditions."
            summary="Explore priority capabilities across slope protection, ground modification, foundation engineering and underground civil works."
          />

          <div className="service-grid service-grid--featured">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>

          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <ButtonLink href="/services" variant="primary">
              View all 8 specialist services
            </ButtonLink>
            <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
              Includes ground improvement, deep piling and infrastructure rehabilitation
            </span>
          </div>
        </Container>
      </section>

      {/* 5. ENGINEERING APPROACH */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="EXECUTION METHODOLOGY"
            title="A disciplined, step-by-step engineering delivery process."
            summary="Every geotechnical package follows systematic stages from initial geological assessment through controlled site execution and rigorous quality sign-off."
          />

          <div className="approach-grid">
            {engineeringApproachSteps.map((step) => (
              <div key={step.num} className="approach-step">
                <span className="approach-step__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FEATURED PROJECTS */}
      <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)" }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <SectionHeading
              eyebrow="PROJECT EVIDENCE"
              title="Verified infrastructure experience across the Sultanate."
              summary="Authentic photographic records from transport corridors and water utility networks in Oman."
            />
            <ButtonLink href="/projects" variant="steel">
              View all project records
            </ButtonLink>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index === 0} />
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <p className="source-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>
                Project records and ongoing/completed classifications are documented from company source files and subject to operational re-confirmation before public launch.
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* 7. VALUES AND STANDARDS */}
      <section className="values-band">
        <Container>
          <p className="eyebrow" style={{ color: "var(--steel-light)" }}>OPERATIONAL STANDARDS</p>
          <h2>Engineering integrity, technical precision and safe site execution.</h2>
          <p className="values-band__lead">
            Geotechnical works on vertical rock slopes, deep excavations and underground
            structures require rigorous technical discipline and accountability at every stage.
          </p>

          <ul className="values-band__grid">
            {valuesList.map((val) => (
              <li key={val.num} className="values-band__item">
                <span className="values-band__item-num">{val.num}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </li>
            ))}
          </ul>

          <div className="values-band__note">
            All methods are planned and executed to relevant Oman ministry specifications and international geotechnical engineering standards.
          </div>
        </Container>
      </section>

      {/* 8. FINAL CONSULTATION CTA */}
      <ContactCta />
    </>
  );
}
