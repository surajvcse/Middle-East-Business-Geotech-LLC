import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: `${service.title} | Geotechnical Services Oman`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const relatedProjects = projects.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug),
  );

  const relatedServices = services.filter((s) =>
    service.relatedServiceSlugs?.includes(s.slug),
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href || `/services/${service.slug}` })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`// ${service.category}`}
        title={service.title}
        summary={service.summary}
      />

      {/* 1. TECHNICAL OVERVIEW & METHODS */}
      <section className="content-section">
        <Container>
          <div className="service-detail-grid">
            <div>
              <p className="eyebrow">{"// ENGINEERING OVERVIEW"}</p>
              <h2 style={{ marginBottom: "1.25rem", color: "var(--navy-deep)" }}>
                Application & Technical Methodology
              </h2>
              <div style={{ color: "var(--muted)", fontSize: "1.0625rem", lineHeight: 1.65 }}>
                <p>{service.introduction}</p>
              </div>

              {service.methods && service.methods.length > 0 ? (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                    Primary Execution Methods
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {service.methods.map((method) => (
                      <span key={method} className="badge badge--steel" style={{ padding: "0.35rem 0.75rem", fontSize: "0.825rem" }}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <section className="detail-spec-card">
                <h2>Scope & Capabilities</h2>
                <ul className="spec-list">
                  {service.capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-spec-card">
                <h2>Typical Applications</h2>
                <ul className="spec-list">
                  {service.applications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. RELATED PROJECTS EVIDENCE */}
      {relatedProjects.length > 0 ? (
        <section className="content-section content-section--canvas" style={{ borderTop: "1px solid var(--border)" }}>
          <Container>
            <SectionHeading
              eyebrow="// PROJECT EVIDENCE"
              title={`Verified ${service.shortTitle} site records in Oman`}
              summary="Authentic project experience where this capability was deployed on road and infrastructure corridors."
            />
            <div className="project-grid">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* 3. RELATED SERVICES */}
      {relatedServices.length > 0 ? (
        <section className="content-section content-section--soft">
          <Container>
            <SectionHeading
              eyebrow="// COMPLEMENTARY DISCIPLINES"
              title="Related geotechnical capabilities"
              summary="Integrated techniques frequently deployed in combination with this service."
            />
            <div className="related-grid">
              {relatedServices.map((relService) => (
                <Link
                  key={relService.slug}
                  href={`/services/${relService.slug}`}
                  className="related-card"
                >
                  <span className="badge badge--steel" style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }}>
                    {relService.category}
                  </span>
                  <h3>{relService.title}</h3>
                  <p>{relService.summary}</p>
                  <span className="text-link" style={{ marginTop: "auto" }}>
                    View capability specification <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* 4. SERVICE SPECIFIC CTA */}
      <ContactCta
        eyebrow="Technical Enquiry"
        title={`Discuss ${service.title} for your site`}
        summary="Supply your project location, borehole logs or tender drawings. Our engineering team in Muscat will evaluate geotechnical parameters and respond with method recommendations."
      />
    </>
  );
}
