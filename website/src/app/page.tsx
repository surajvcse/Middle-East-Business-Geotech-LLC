import { ContractorRoleAnimated } from "@/components/sections/contractor-role-animated";
import { ExecutionMethodologyAnimated } from "@/components/sections/execution-methodology-animated";
import { FeaturedProjectsAnimated } from "@/components/sections/featured-projects-animated";

import { HeroGlobeExpress } from "@/components/sections/hero-globe-express";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesInteractiveAccordion } from "@/components/services/services-interactive-accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MaskedTextReveal } from "@/components/ui/masked-text-reveal";
import { OperationalStandardsAnimated } from "@/components/sections/operational-standards-animated";
import { company } from "@/content/company";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

const engineeringApproachSteps = [
  {
    num: "01",
    title: "Geological Assessment",
    desc: "We study soil and rock tests, borehole logs, and site risks with your project consultants before starting work.",
  },
  {
    num: "02",
    title: "Method Engineering",
    desc: "We choose the right drilling rigs, calculate anchor loads, and prepare clear execution plans for your site conditions.",
  },
  {
    num: "03",
    title: "Controlled Site Work",
    desc: "Our crawler drill rigs, rope-access technicians, and grouting teams execute the work safely under daily quality control.",
  },
  {
    num: "04",
    title: "Testing & Sign-Off",
    desc: "We test every ground anchor, verify shotcrete strength, and provide certified quality reports for consultant approval.",
  },
];

const valuesList = [
  {
    num: "01",
    title: "Engineering Integrity",
    desc: "Practical decisions based on real ground facts, clear testing, and proven engineering standards.",
  },
  {
    num: "02",
    title: "Technical Precision",
    desc: "Modern drilling and grouting equipment calibrated to meet exact project specifications.",
  },
  {
    num: "03",
    title: "Safety & Well-Being",
    desc: "Certified rope-access gear and zero-compromise safety rules on steep mountain slopes.",
  },
  {
    num: "04",
    title: "Environmental Care",
    desc: "Clean grout control and runoff management to protect Oman’s natural valleys and desert terrain.",
  },
  {
    num: "05",
    title: "Accountable Delivery",
    desc: "Clear daily site reporting and dependable execution for consultants and main contractors.",
  },
];

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* 1. CINEMATIC EXPANDING-CARD HERO */}
      <HeroGlobeExpress projects={projects} company={company} />

      {/* 2. COMPANY INTRODUCTION */}
      <ContractorRoleAnimated company={company} />

      {/* 3. CORE SERVICES */}
      <section className="content-section content-section--soft">
        <Container>
          <SectionHeading
            eyebrow="CORE GEOTECHNICAL DISCIPLINES"
            title="Specialist geotechnical methods built for Oman's ground conditions."
            summary="Core engineering disciplines for road, water, and civil infrastructure across the Sultanate."
          />

          <ServicesInteractiveAccordion services={featuredServices} />

          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <ButtonLink href="/services" variant="primary">
              View all 8 specialist services
            </ButtonLink>
            <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
              Includes ground improvement, deep piling, and underground works
            </span>
          </div>
        </Container>
      </section>

      {/* 4. ENGINEERING APPROACH / EXECUTION METHODOLOGY */}
      <ExecutionMethodologyAnimated steps={engineeringApproachSteps} />

      {/* 5. FEATURED PROJECTS */}
      <FeaturedProjectsAnimated projects={featuredProjects} />

      {/* 6. VALUES AND STANDARDS */}
      <OperationalStandardsAnimated
        eyebrow="OPERATIONAL STANDARDS"
        heading={
          <MaskedTextReveal as="h2" type="lines" stagger={0.09} trigger="scroll" scrollStart="top 85%">
            Engineering integrity, technical precision and safe site execution.
          </MaskedTextReveal>
        }
        lead="Disciplined site work and uncompromising safety on steep rock faces and deep excavations."
        standards={valuesList}
        note="All methods follow Oman ministry specifications and international geotechnical engineering standards."
      />

      {/* 7. FINAL CONSULTATION CTA */}
      <ContactCta />
    </>
  );
}
