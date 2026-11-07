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
        summary="Connect directly with our engineering team in Muscat. We review soil and rock reports, borehole logs, and tender drawings to provide clear, practical geotechnical proposals."
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
                  For tender enquiries, site visits, or technical questions, contact our engineers directly:
                </p>

                <div className="contact-channels">
                  {/* Channel 1: Telephone */}
                  <div className="contact-channel-item">
                    <div style={{ color: "var(--steel)", marginTop: "0.2rem" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>Telephone</h3>
                      <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
                      <p style={{ color: "var(--muted)", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>Direct line for project questions and tender enquiries</p>
                    </div>
                  </div>

                  {/* Channel 2: WhatsApp Direct */}
                  <div className="contact-channel-item">
                    <div style={{ marginTop: "0.2rem" }}>
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
                        <path fill="#25D366" d="M16 3C8.82 3 3 8.82 3 16c0 2.55.73 4.93 2 6.96L3.2 29l6.23-1.76A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
                        <path fill="#FFFFFF" d="M21.9 19.34c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.18.26-.68.86-.83 1.03-.15.17-.31.2-.57.07-.26-.13-1.11-.41-2.11-1.3-.78-.7-1.31-1.56-1.47-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.17-.5-.3z"/>
                      </svg>
                    </div>
                    <div>
                      <h3>WhatsApp Direct</h3>
                      <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy)", fontWeight: 600 }}>
                        {company.whatsapp}
                      </a>
                      <p style={{ color: "var(--muted)", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>
                        Send site photos, drawings, and location pins for quick review
                      </p>
                    </div>
                  </div>

                  {/* Channel 3: Technical Email */}
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
                        Send drawings, tender documents, or borehole logs
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Contact Action Buttons */}
                <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a
                    href={company.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-link"
                    style={{
                      width: "100%",
                      backgroundColor: "#25D366",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      fontWeight: 700,
                      boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ display: "block" }}>
                      <path fill="#FFFFFF" d="M16 3C8.82 3 3 8.82 3 16c0 2.55.73 4.93 2 6.96L3.2 29l6.23-1.76A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
                      <path fill="#25D366" d="M21.9 19.34c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.18.26-.68.86-.83 1.03-.15.17-.31.2-.57.07-.26-.13-1.11-.41-2.11-1.3-.78-.7-1.31-1.56-1.47-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.17-.5-.3z"/>
                    </svg>
                    <span>Message on WhatsApp</span>
                  </a>
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
                  To help our engineering team provide an accurate review and quotation, please share the following details with your project enquiry:
                </p>

                <ol className="intake-steps">
                  <li className="intake-step">
                    <span className="intake-step__num">1</span>
                    <div>
                      <h3>Project Location & Site Access</h3>
                      <p>
                        Tell us the governorate, road, or GPS coordinates, along with any access limits for heavy drilling rigs or high-angle slope equipment.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">2</span>
                    <div>
                      <h3>Soil & Rock Information</h3>
                      <p>
                        Share available soil investigation reports, borehole logs, rock photos, or groundwater observations.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">3</span>
                    <div>
                      <h3>Scope of Work & Drawings</h3>
                      <p>
                        Include tender drawings, cross-sections, required anchor loads, shotcrete thickness, or bill of quantities (BOQ) if available.
                      </p>
                    </div>
                  </li>
                  <li className="intake-step">
                    <span className="intake-step__num">4</span>
                    <div>
                      <h3>Target Schedule & Milestones</h3>
                      <p>
                        Let us know your target start date, project milestones, and any coordination needed with main civil contractors.
                      </p>
                    </div>
                  </li>
                </ol>

                <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <p style={{ color: "var(--muted-light)", fontSize: "0.825rem", margin: 0 }}>
                    <strong>Confidentiality Notice:</strong> All drawings, borehole logs, and tender details submitted to Middle East Business Geotech LLC are kept strictly confidential.
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
