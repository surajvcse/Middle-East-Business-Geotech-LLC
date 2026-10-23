import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Infrastructure Projects in Oman",
  description:
    "Review verified slope-protection and geotechnical infrastructure experience across Buraimi, Musandam, Nizwa and Al Sharqiyah in the Sultanate of Oman.",
};

export default function ProjectsPage() {
  const ongoingProjects = projects.filter((p) => p.documentStatus.includes("Ongoing"));
  const completedProjects = projects.filter((p) => p.documentStatus.includes("Completed"));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
        eyebrow="PROJECT PORTFOLIO"
        title="Project evidence from demanding infrastructure environments in Oman."
        summary="Review verified project records covering rock bolting, shotcrete benches, wire netting drapery, ditch lining and rockfall barrier installations executed for government authorities and leading contractors."
      />

      <section className="content-section">
        <Container>
          <div style={{ marginBottom: "2.5rem" }}>
            <p className="source-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>
                <strong>Documented Status Qualification:</strong> Status labels reflect company source documentation. As part of our commitment to engineering accuracy, current operational statuses will be formally re-confirmed prior to final commercial launch.
              </span>
            </p>
          </div>

          <SectionHeading
            eyebrow="ACTIVE CONTRACTS"
            title="Projects documented as ongoing in company records"
            summary="Strategic road corridors and regional water infrastructure under active geotechnical slope protection."
          />

          <div className="project-grid" style={{ marginBottom: "4rem" }}>
            {ongoingProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index === 0} />
            ))}
          </div>

          <SectionHeading
            eyebrow="COMPLETED PACKAGES"
            title="Projects documented as completed in company records"
            summary="Delivered slope stabilisation and civil protection works along major expressway and pipeline corridors."
          />

          <div className="project-grid">
            {completedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Tender & Project Enquiries"
        title="Have a comparable infrastructure site in Oman?"
        summary="Discuss your slope protection, grouting or foundation requirements with our Muscat team. We provide preliminary constructability reviews and detailed method statements."
      />
    </>
  );
}
