import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import type { ServiceCategory } from "@/types/content";

export const metadata: Metadata = {
  title: "Specialist Geotechnical Services",
  description:
    "Explore our 8 core geotechnical disciplines in Oman: slope stabilisation, rock bolting, shotcrete, rockfall barriers, grouting, piling, tunnelling, and rehabilitation.",
};

const serviceCategories: Array<{
  category: ServiceCategory;
  description: string;
}> = [
  {
    category: "Slope Stabilization & Rockfall",
    description:
      "Comprehensive active and passive slope reinforcement systems for mountain transport corridors, civil cuttings and steep rock faces across Oman.",
  },
  {
    category: "Ground Improvement & Grouting",
    description:
      "Targeted sub-surface grouting techniques to modify permeability, increase bearing capacity and arrest underground water ingress.",
  },
  {
    category: "Piling & Deep Foundations",
    description:
      "Specialist bored and driven piling systems, soldier piles, micropiling and rigid earth retention for deep excavations and structural foundations.",
  },
  {
    category: "Underground & Specialist Works",
    description:
      "Conventional and mechanized tunnelling, shaft sinking, microtunnelling and forensic structural rehabilitation of civil infrastructure.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        eyebrow="CAPABILITY CATALOGUE"
        title="Specialist geotechnical methods selected around the ground and project."
        summary="From active rock bolting and high-pressure shotcrete to jet grouting, deep bored piling and underground tunnelling, our design and execution capabilities address complex ground conditions across the Sultanate of Oman."
      />

      <section className="content-section">
        <Container>
          <div className="services-catalog">
            {serviceCategories.map((group) => {
              const groupServices = services.filter(
                (service) => service.category === group.category,
              );

              return (
                <div key={group.category} className="service-category-group">
                  <div className="service-category-header">
                    <div>
                      <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
                        Discipline Group
                      </span>
                      <h3>{group.category}</h3>
                      <p style={{ color: "var(--muted)", margin: "0.25rem 0 0", fontSize: "0.95rem", maxWidth: "44rem" }}>
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="service-grid">
                    {groupServices.map((service, index) => (
                      <ServiceCard
                        key={service.slug}
                        service={service}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactCta
        eyebrow="Technical Consultation"
        title="Need guidance on method selection for your site?"
        summary="Speak with our geotechnical engineers in Muscat. We evaluate site borehole data, rock mass ratings, and logistical constraints to recommend the most cost-effective and safe geotechnical methodology."
      />
    </>
  );
}
