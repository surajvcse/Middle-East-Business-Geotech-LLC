import Image from "next/image";

import { HeroFullBleed } from "@/components/sections/hero-full-bleed";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesInteractiveAccordion } from "@/components/services/services-interactive-accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { withBasePath } from "@/lib/site-path";

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
      {/* 1. CINEMATIC FULL-BLEED HERO & CAPABILITY DOCK (AgriNova Style Authority) */}
      <HeroFullBleed projects={projects} company={company} />

      {/* 3. COMPANY INTRODUCTION */}
      <section className="content-section editorial-section">
        <Container className="two-column-editorial">
          {/* Left Column: Technical Capability Dossier */}
          <div className="editorial-col-left">
            <SectionHeading
              eyebrow="SPECIALIST CONTRACTOR ROLE · SULTANATE OF OMAN"
              title="Design and execution capability built around Oman’s demanding geology."
            />
            <div className="editorial-capability-card">
              <div className="editorial-capability-card__header">
                <div className="editorial-capability-card__tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <span>Specialist Discipline Scope</span>
                </div>
                <div className="editorial-capability-card__registry">
                  <span className="registry-dot" aria-hidden="true" />
                  <span>CR {company.crNumber} · Muscat</span>
                </div>
              </div>

              <ul className="editorial-capability-items">
                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">01</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Design & Build Integration</h4>
                      <span className="editorial-item-pill">Turnkey Package</span>
                    </div>
                    <p>
                      Translating geological data, borehole stratigraphy, and rock mass discontinuity surveys into constructible site packages.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Borehole Correlation</span>
                      <span>Discontinuity Mapping</span>
                      <span>Prestressed Anchor Design</span>
                    </div>
                  </div>
                </li>

                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">02</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Specialist Plant & High-Angle Rigging</h4>
                      <span className="editorial-item-pill">Rigging Plant</span>
                    </div>
                    <p>
                      Tracked hydraulic drilling rigs, crane-suspended work platforms, and certified rope-access crews on steep mountain cuttings.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Tracked Crawler Rigs</span>
                      <span>Suspended Platforms</span>
                      <span>Certified Rope-Access</span>
                    </div>
                  </div>
                </li>

                <li className="editorial-capability-item">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">03</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Rigorous QA/QC Verification</h4>
                      <span className="editorial-item-pill">Certified Sign-Off</span>
                    </div>
                    <p>
                      Prestressed anchor pull-out proof testing, high-pressure grout pressure logging, and shotcrete core compressive analysis.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Proof Testing Loads</span>
                      <span>Continuous Grout Logs</span>
                      <span>Core Analysis</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="editorial-capability-card__footer">
                <div className="editorial-footer-heading">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Active Regional Deployments in Oman:</span>
                </div>
                <div className="governorate-pills">
                  <span className="governorate-pill governorate-pill--hq">
                    <span className="pin-dot" />
                    <strong>Muscat</strong> (HQ & Central Yard)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Musandam</strong> (Sea-Cliffs)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Al Sharqiyah</strong> (Expressways)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Nizwa</strong> (Water Network)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Buraimi</strong> (Rock Cuts)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Real Photographic Site Evidence & Authority Metrics */}
          <div className="editorial-col-right">
            <div className="editorial-lead-quote">
              <p className="editorial-lead-text">
                Headquartered in Muscat, Middle East Business Geotech LLC bridges the critical gap between geotechnical design and safe site execution across Oman’s rugged geological conditions.
              </p>
              <p className="editorial-sub-text">
                We partner with civil authorities, engineering consultants, and leading EPC main contractors to safely execute slope stabilisation, deep foundation, and underground packages on schedule.
              </p>
            </div>

            {/* Authentic Engineering Visual Card */}
            <div className="editorial-visual-card">
              <div className="editorial-visual-card__media">
                <Image
                  src={withBasePath("/images/projects/khasab-lima-road-01.jpeg")}
                  alt="Crane-supported slope protection and specialised drilling on steep coastal rock face in Musandam, Oman"
                  width={640}
                  height={320}
                  className="editorial-visual-card__img"
                />
                <div className="editorial-visual-card__badge">
                  <span className="status-indicator-live" />
                  <span>Verified Site Execution · Musandam</span>
                </div>
              </div>
              <div className="editorial-visual-card__content">
                <p className="editorial-visual-card__caption">
                  High-angle crane-suspended work platforms & rope-access drilling securing vertical limestone formations.
                </p>
                <span className="editorial-visual-card__authority">
                  Aligned with MTCIT & Nama Water Engineering Specifications
                </span>
              </div>
            </div>

            {/* High-Impact Authority Metrics */}
            <div className="editorial-stats-grid">
              <div className="stat-card">
                <div className="stat-card__icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="stat-card__info">
                  <span className="stat-card__label">Headquarters & Fleet Base</span>
                  <strong className="stat-card__value">Muscat, Sultanate of Oman</strong>
                  <span className="stat-card__hint">South Al Khuwair Base · Nationwide Mobilization</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="stat-card__info">
                  <span className="stat-card__label">Operational Focus</span>
                  <strong className="stat-card__value">Road, Water & Civil Infrastructure</strong>
                  <span className="stat-card__hint">Slopes · Grouting · Deep Piling · Underground</span>
                </div>
              </div>
            </div>

            {/* Action Group */}
            <div className="editorial-actions">
              <ButtonLink href="/about" variant="primary">
                About our engineering background
              </ButtonLink>
              <ButtonLink href="/projects" variant="steel">
                Inspect project records
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

          <ServicesInteractiveAccordion services={featuredServices} />

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
