import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/projects/project-gallery";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { getProject, projects } from "@/content/projects";
import { services } from "@/content/services";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.shortTitle} | Geotechnical Project Case`,
    description: `${project.scope} Executed for ${project.client} in ${project.location}.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const relatedServices = services.filter((service) =>
    project.serviceSlugs.includes(service.slug),
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.shortTitle },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href || `/projects/${project.slug}` })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`// PROJECT RECORD · ${project.location.toUpperCase()}`}
        title={project.title}
        summary={`Specialist geotechnical slope protection scope delivered for ${project.client}.`}
      />

      {/* 1. PROJECT SPECIFICATIONS */}
      <section className="content-section" style={{ paddingBottom: "2rem" }}>
        <Container>
          <dl className="project-facts">
            <div>
              <dt>Location & Region</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Client / Main Contractor</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Documented Scope</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Source Record Status</dt>
              <dd>
                <span className={`badge ${project.documentStatus.includes("Ongoing") ? "badge--accent" : "badge--verified"}`}>
                  {project.documentStatus}
                </span>
              </dd>
            </div>
          </dl>

          <div style={{ marginTop: "1.25rem" }}>
            <p className="source-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>
                <strong>Verification Note:</strong> Project status is reproduced from company documentation and is maintained with this qualification until verified for public launch.
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* 2. AUTHENTIC PHOTOGRAPHY SHOWCASE */}
      <section className="content-section content-section--canvas" style={{ borderBlock: "1px solid var(--border)" }}>
        <Container>
          <SectionHeading
            eyebrow="// SITE PHOTOGRAPHY"
            title="Authentic project execution records"
            summary="Real site photographs documenting completed benches, drilling access, rock bolt installations, and high-tensile wire netting on location."
          />

          <ProjectGallery images={project.images} />
        </Container>
      </section>

      {/* 3. DEPLOYED CAPABILITIES */}
      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="// DEPLOYED DISCIPLINES"
            title="Geotechnical capabilities deployed on this site"
            summary="Specialist engineering methods integrated to address slope stability and asset protection on this project."
          />

          <div className="related-grid">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="related-card"
              >
                <span className="badge badge--steel" style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }}>
                  {service.category}
                </span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <span className="text-link" style={{ marginTop: "auto" }}>
                  Inspect capability specification <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Similar Infrastructure Scope?"
        title="Consult our team on comparable site conditions in Oman."
        summary="From steep mountain cuttings to pipeline slope protection, our Muscat engineers evaluate site geology, borehole data and logistical requirements."
      />
    </>
  );
}
