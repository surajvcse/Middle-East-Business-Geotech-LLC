
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
        <Container>
          <div className="editorial-header">
            <p className="eyebrow">SPECIALIST CONTRACTOR ROLE · SULTANATE OF OMAN</p>
            <div className="editorial-header__grid">
              <h2 className="editorial-header__title">
                Design and execution capability built around Oman’s demanding geology.
              </h2>
              <p className="editorial-header__lead">
                Headquartered in Muscat, Middle East Business Geotech LLC bridges the critical gap between geotechnical design and safe site execution—partnering with civil authorities, engineering consultants, and leading EPC main contractors across the Sultanate.
              </p>
            </div>
          </div>

          <div className="editorial-cards-grid">
            {/* Card 1: Technical Methodology Scope */}
            <div className="editorial-card">
              <div className="editorial-card__header">
                <span className="badge badge--navy">Specialist Discipline Scope</span>
                <span className="editorial-card__meta">CR {company.crNumber} · Muscat</span>
              </div>

              <div className="editorial-card__body">
                <div className="editorial-card__item">
                  <div className="editorial-card__num" aria-hidden="true">01</div>
                  <div className="editorial-card__text">
                    <h3>Design & Build Integration</h3>
                    <p>
                      Direct translation of borehole logs, geological discontinuity surveys, and rock mechanics into constructible site packages.
                    </p>
                  </div>
                </div>

                <div className="editorial-card__item">
                  <div className="editorial-card__num" aria-hidden="true">02</div>
                  <div className="editorial-card__text">
                    <h3>Specialist Plant & High-Angle Rigging</h3>
                    <p>
                      Tracked hydraulic drilling rigs, crane-suspended work platforms, and certified rope-access crews on steep mountain cuttings.
                    </p>
                  </div>
                </div>

                <div className="editorial-card__item">
                  <div className="editorial-card__num" aria-hidden="true">03</div>
                  <div className="editorial-card__text">
                    <h3>Rigorous QA/QC Verification</h3>
                    <p>
                      Anchor pull-out proof testing, high-pressure grout pressure logging, and shotcrete core compressive strength analysis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="editorial-card__footer">
                <div className="editorial-deployments">
                  <span className="editorial-deployments__label">Active Regional Deployments:</span>
                  <div className="editorial-deployments__pills">
                    <span className="editorial-deployments__pill editorial-deployments__pill--hq">
                      <span className="editorial-deployments__dot" />
                      <strong>Muscat</strong> (HQ & Central Yard)
                    </span>
                    <span className="editorial-deployments__pill">
                      <span className="editorial-deployments__dot" />
                      <strong>Musandam</strong> (Sea-Cliffs)
                    </span>
                    <span className="editorial-deployments__pill">
                      <span className="editorial-deployments__dot" />
                      <strong>Al Sharqiyah</strong> (Expressways)
                    </span>
                    <span className="editorial-deployments__pill">
                      <span className="editorial-deployments__dot" />
                      <strong>Nizwa</strong> (Water Network)
                    </span>
                    <span className="editorial-deployments__pill">
                      <span className="editorial-deployments__dot" />
                      <strong>Buraimi</strong> (Rock Cuts)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Operating Framework & Contractor Capacity */}
            <div className="editorial-card editorial-card--accent">
              <div className="editorial-card__header">
                <span className="badge badge--steel">Operating Framework</span>
                <span className="editorial-card__meta">Sultanate of Oman</span>
              </div>

              <div className="editorial-card__body">
                <div className="editorial-card__item">
                  <div className="editorial-card__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="editorial-card__text">
                    <h3>Muscat Headquarters & Central Fleet Base</h3>
                    <p>
                      Central management and specialized plant staging located in South Al Khuwair, facilitating rapid nationwide mobilization across all Governorates.
                    </p>
                  </div>
                </div>

                <div className="editorial-card__item">
                  <div className="editorial-card__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div className="editorial-card__text">
                    <h3>Road, Water & Civil Infrastructure Focus</h3>
                    <p>
                      Specialized geotechnical packages supporting highway slope stabilization, regional water transmission protection, deep foundation piling, and underground excavation.
                    </p>
                  </div>
                </div>

                <div className="editorial-card__item">
                  <div className="editorial-card__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="editorial-card__text">
                    <h3>Ministry & International Specifications</h3>
                    <p>
                      Packages planned and executed to relevant Oman ministry specifications (MTCIT / Nama Water) and international BS 8081, ASTM, and Eurocode 7 standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="editorial-card__footer">
                <div className="editorial-actions-footer">
                  <ButtonLink href="/about" variant="primary">
                    About our engineering background
                  </ButtonLink>
                  <ButtonLink href="/projects" variant="steel">
                    Inspect project records
                  </ButtonLink>
                </div>
              </div>
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
