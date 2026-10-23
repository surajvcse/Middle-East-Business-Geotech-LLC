import type { Metadata } from "next";

import { HeadquartersMap } from "@/components/maps/headquarters-map";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact Our Muscat Office",
  description:
    "Contact Middle East Business Geotech LLC in Muscat to discuss geotechnical tenders, slope stabilisation, grouting, piling and underground works across Oman.",
};

export default function ContactPage() {
  const mailtoSubject = encodeURIComponent("Technical Geotechnical Enquiry - Middle East Business Geotech LLC");
  const mailtoBody = encodeURIComponent(
    "Dear MEB Geotech Engineering Team,\n\n" +
    "We would like to discuss a geotechnical requirement in Oman. Below are preliminary project details:\n\n" +
    "- Project Name & Location:\n" +
    "- Client / Main Contractor:\n" +
    "- Required Discipline (Slope Protection / Grouting / Piling / Tunnelling / Other):\n" +
    "- Geological Summary / Site Conditions:\n" +
    "- Target Schedule / Mobilisation Window:\n\n" +
    "Best regards,\n[Your Name / Company / Contact Phone]"
  );

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        eyebrow="MUSCAT HEADQUARTERS"
        title="Discuss site conditions, geotechnical scope and tender constraints."
        summary="Connect directly with our engineering and estimation team in Muscat. We review geological reports, borehole logs and tender drawings to develop qualified geotechnical proposals."
      />

      <section className="content-section">
        <Container>
          <div className="contact-layout">
            {/* Left Column: Direct Contacts & Office Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <section className="contact-card">
                <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
                  Direct Communication
                </span>
                <h2>Direct Engineering Channels</h2>
                <p style={{ color: "var(--muted)", margin: "0 0 1.25rem", fontSize: "0.95rem" }}>
                  For immediate tender enquiries, site visits, or technical consultations, contact our project engineers directly:
                </p>

                <div className="contact-channels">
                  <div className="contact-channel-item">
                    <div style={{ color: "var(--steel)", marginTop: "0.2rem" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Telephone</h3>
                      <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
                      <p style={{ color: "var(--muted)", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>
                        Sunday to Thursday, 8:00 AM – 5:00 PM (GST)
                      </p>
                    </div>
                  </div>

                  <div className="contact-channel-item">
                    <div style={{ color: "var(--steel)", marginTop: "0.2rem" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Technical Email</h3>
                      <a href={`mailto:${company.email}?subject=${mailtoSubject}&body=${mailtoBody}`}>
                        {company.email}
                      </a>
                      <p style={{ color: "var(--muted)", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>
                        Send drawings, tender documents, or borehole records
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.75rem" }}>
                  <a
                    href={`mailto:${company.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="button-link button-link--primary"
                    style={{ width: "100%" }}
                  >
                    Open Pre-Formatted Email Draft
                  </a>
                </div>
              </section>

              <HeadquartersMap />
            </div>

            {/* Right Column: Tender & Technical Consultation Guide */}
            <div>
              <div className="intake-guide-card">
                <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
                  Procurement & Tender Guide
                </span>
                <h2 style={{ fontSize: "1.35rem", margin: "0.5rem 0 1rem" }}>
                  Preparing Your Geotechnical Enquiry
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.925rem", lineHeight: 1.6 }}>
                  To ensure our engineering team can provide an accurate constructability assessment and commercial quotation, we recommend supplying the following technical inputs when submitting your project enquiry:
                </p>

                <ol className="intake-steps">
                  <li className="intake-step">
                    <span className="intake-step__num">1</span>
                    <div>
                      <h3>Project Location & Site Access</h3>
                      <p>
                        Specify the governorate, road corridor or utility coordinates, along with any access constraints for heavy drilling rigs or suspended slope platforms.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">2</span>
                    <div>
                      <h3>Geological & Borehole Information</h3>
                      <p>
                        Provide available geotechnical investigation reports, borehole logs, rock mass discontinuity surveys, or groundwater level observations.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">3</span>
                    <div>
                      <h3>Scope & Drawings</h3>
                      <p>
                        Include tender drawings, cross-sections, required anchor loads, shotcrete thickness, piling layout, or bill of quantities (BOQ) where available.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">4</span>
                    <div>
                      <h3>Schedule & Phasing Constraints</h3>
                      <p>
                        State target mobilisation dates, intermediate milestone constraints, and coordination requirements with ongoing earthworks or civil contractors.
                      </p>
                    </div>
                  </li>
                </ol>

                <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <p style={{ color: "var(--muted-light)", fontSize: "0.825rem", margin: 0 }}>
                    <strong>Confidentiality Notice:</strong> All technical drawings, tender data and project details submitted to Middle East Business Geotech LLC are handled with strict commercial confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
