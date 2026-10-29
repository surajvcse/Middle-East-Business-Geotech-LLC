import { ContractorRoleAnimated } from "@/components/sections/contractor-role-animated";
import { ExecutionMethodologyAnimated } from "@/components/sections/execution-methodology-animated";
import { FeaturedProjectsAnimated } from "@/components/sections/featured-projects-animated";

import { HeroFullBleed } from "@/components/sections/hero-full-bleed";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesInteractiveAccordion } from "@/components/services/services-interactive-accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MaskedTextReveal } from "@/components/ui/masked-text-reveal";
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

      {/* 3. COMPANY INTRODUCTION (Locomotive Scroll Animation) */}
      <ContractorRoleAnimated company={company} />

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

      {/* 5. ENGINEERING APPROACH / EXECUTION METHODOLOGY */}
      <ExecutionMethodologyAnimated steps={engineeringApproachSteps} />

      {/* 6. FEATURED PROJECTS */}
      <FeaturedProjectsAnimated projects={featuredProjects} />

      {/* 7. VALUES AND STANDARDS */}
      <section className="values-band">
        <Container>
          <p className="eyebrow" style={{ color: "var(--steel-light)" }}>OPERATIONAL STANDARDS</p>
          <MaskedTextReveal as="h2" type="lines" stagger={0.09} trigger="scroll" scrollStart="top 85%">
            Engineering integrity, technical precision and safe site execution.
          </MaskedTextReveal>
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
