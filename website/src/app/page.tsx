import Link from "next/link";

import { HeroProjectSlider } from "@/components/projects/hero-project-slider";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { DynamicHeadline } from "@/components/ui/dynamic-headline";
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
    title: "Geological Assessment",
    desc: "Borehole log review, rock mass analysis and constructability checks with project consultants.",
  },
  {
    num: "02",
    title: "Method Engineering",
    desc: "Rig selection, anchor load design and execution methodology tailored to site ground risks.",
  },
  {
    num: "03",
    title: "Controlled Execution",
    desc: "Specialist drilling rigs, rope-access slope crews and calibrated grouting plants under strict QA/QC.",
  },
  {
    num: "04",
    title: "Testing & Sign-Off",
    desc: "Proof pull-out tests, shotcrete coring, anchor load logs and certified handover dossiers.",
  },
];

const valuesList = [
  {
    num: "01",
    title: "Engineering Integrity",
    desc: "Decisions grounded in geological evidence and transparent ground risk evaluation.",
  },
  {
    num: "02",
    title: "Technical Precision",
    desc: "Calibrated drilling and grouting equipment aligned to exact design specifications.",
  },
  {
    num: "03",
    title: "Safety & Well-Being",
    desc: "Certified rope-access gear and zero-compromise protocols on steep rock slopes.",
  },
  {
    num: "04",
    title: "Environmental Care",
    desc: "Grout containment, runoff control and minimal footprint on Oman’s natural terrain.",
  },
  {
    num: "05",
    title: "Accountable Delivery",
    desc: "Transparent reporting and reliable execution for consultants and EPC contractors.",
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
            <div className="hero__eyebrow-badge">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              <span className="hero__eyebrow-text">
                SPECIALIST GEOTECHNICAL CONTRACTOR · MUSCAT, OMAN
              </span>
            </div>

            <DynamicHeadline />

            <p className="hero__summary">
              Specialist geotechnical contractor delivering slope protection, ground engineering and deep foundations across the Sultanate of Oman.
            </p>

            <div className="hero__actions" aria-label="Primary actions">
              <ButtonLink href="/contact" variant="primary">
                <span>Request a consultation</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                </svg>
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Explore project records
              </ButtonLink>
            </div>

            <div className="hero__trust-cue">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ color: "var(--accent)" }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Direct tender desk response within 24h</span>
            </div>

            {/* Authority Qualification Pillars */}
            <div className="hero__pillars" aria-label="Key corporate qualifications">
              <div className="hero__pillar">
                <span className="hero__pillar-label">COMMERCIAL REG.</span>
                <div className="hero__pillar-main">
                  <span className="hero__pillar-val">CR {company.crNumber}</span>
                  <span className="hero__pillar-badge">MoCI</span>
                </div>
                <span className="hero__pillar-desc">Oman Civil Works Licensed</span>
              </div>

              <div className="hero__pillar">
                <span className="hero__pillar-label">HEADQUARTERS</span>
                <div className="hero__pillar-main">
                  <span className="hero__pillar-val">Muscat, Oman</span>
                </div>
                <span className="hero__pillar-desc">Central Fleet Depot</span>
              </div>

              <div className="hero__pillar">
                <span className="hero__pillar-label">CONTRACTING</span>
                <div className="hero__pillar-main">
                  <span className="hero__pillar-val">Design & Build</span>
                  <span className="hero__pillar-badge hero__pillar-badge--accent">Turnkey</span>
                </div>
                <span className="hero__pillar-desc">Specialist Plant & Fleet</span>
              </div>
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
                      Translating geological data and borehole logs into constructible site packages.
                    </p>
                  </div>
                </li>
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__num" aria-hidden="true">
                    02
                  </div>
                  <div className="editorial-capability-item__body">
                    <h4>Specialist Plant & Rigging</h4>
                    <p>
                      Tracked drilling rigs, crane-suspended platforms and certified rope-access crews.
                    </p>
                  </div>
                </li>
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__num" aria-hidden="true">
                    03
                  </div>
                  <div className="editorial-capability-item__body">
                    <h4>QA/QC Verification</h4>
                    <p>
                      Anchor pull-out testing, shotcrete core analysis and pressure grouting logs.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="editorial-capability-card__footer">
                <span>Deployments Across Oman:</span>
                <div className="governorate-pills">
                  <span className="badge">Musandam</span>
                  <span className="badge">Buraimi</span>
                  <span className="badge">Nizwa</span>
                  <span className="badge">Al Sharqiyah</span>
                  <span className="badge">Muscat</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Headquartered in Muscat, Middle East Business Geotech LLC bridges the critical gap between geotechnical design and safe site execution across Oman’s rugged geological conditions.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              We partner with civil authorities, engineering consultants, and leading EPC main contractors to safely execute slope stabilisation, deep foundation, and underground packages on schedule.
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

            <div style={{ marginTop: "1.75rem" }}>
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
            summary="Core engineering disciplines for road, water, and civil infrastructure across Oman."
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
            summary="Systematic 4-stage delivery from initial ground risk analysis to certified QA/QC sign-off."
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
              summary="Photographic evidence from active and completed geotechnical packages in Oman."
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
                Documented from company engineering records, site logs and contract submittals.
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
            Disciplined execution and uncompromising safety on steep rock faces and deep excavations.
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
