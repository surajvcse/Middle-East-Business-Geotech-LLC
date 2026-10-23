import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and technical data handling notice for Middle East Business Geotech LLC.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        eyebrow="// CORPORATE GOVERNANCE"
        title="Privacy Policy & Data Handling Notice."
        summary="How Middle East Business Geotech LLC handles technical project enquiries, corporate correspondence and website visitor information."
      />

      <section className="content-section">
        <Container>
          <div style={{ maxWidth: "46rem", marginInline: "auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div style={{ padding: "1.25rem 1.5rem", background: "var(--canvas-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
                Operational Status Note
              </span>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                This privacy policy provides our interim technical data handling standard. A final comprehensive legal privacy statement will be published following formal operational confirmation of enquiry storage, web hosting and analytics configurations prior to public commercial launch.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                1. Information We Receive
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                When you contact Middle East Business Geotech LLC via telephone, email, or formal correspondence, we collect professional information necessary to evaluate and respond to your geotechnical engineering enquiry. This may include:
              </p>
              <ul style={{ color: "var(--muted)", paddingLeft: "1.25rem", lineHeight: 1.65 }}>
                <li>Your name, job title, and organization name.</li>
                <li>Business contact details (email address, telephone number, office address).</li>
                <li>Project technical information (location, site parameters, borehole logs, tender scope, drawings).</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                2. Use of Information
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                We use the information you provide solely to:
              </p>
              <ul style={{ color: "var(--muted)", paddingLeft: "1.25rem", lineHeight: 1.65 }}>
                <li>Evaluate constructability, geotechnical parameters, and scope requirements.</li>
                <li>Prepare and submit commercial proposals, engineering method statements, and tenders.</li>
                <li>Communicate with your project team regarding technical coordination and site visits.</li>
                <li>Fulfil statutory, contractual, and commercial registration obligations in the Sultanate of Oman.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                3. Technical Drawing & Tender Confidentiality
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                We treat all client and consultant project documentation—including borehole logs, structural drawings, geotechnical investigation reports, and tender pricing—with strict commercial confidentiality. Documents are reviewed exclusively by authorized technical and estimating personnel.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                4. Third-Party Disclosures
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                We do not sell, rent, or trade your contact or project details. Information is shared externally only when required to execute agreed project scopes (e.g., submitting required subcontractor packages to project owners or consultants) or where mandated by applicable laws of the Sultanate of Oman.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem", color: "var(--navy-deep)" }}>
                5. Contact for Privacy Matters
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                For any questions regarding this policy or the handling of your project documentation, please contact our registered office:
              </p>
              <address style={{ color: "var(--navy)", fontStyle: "normal", lineHeight: 1.6, marginTop: "0.5rem" }}>
                <strong>{company.name}</strong><br />
                {company.address.line1}, {company.address.line2}<br />
                {company.address.postal}, {company.address.city}, {company.address.country}<br />
                Email: <a href={`mailto:${company.email}`} style={{ textDecoration: "underline" }}>{company.email}</a><br />
                Phone: <a href={`tel:${company.phoneHref}`} style={{ textDecoration: "underline" }}>{company.phone}</a>
              </address>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
