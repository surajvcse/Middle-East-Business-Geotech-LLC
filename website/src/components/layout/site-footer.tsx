import Link from "next/link";

import { Container } from "@/components/ui/container";
import { company, primaryNavigation } from "@/content/company";
import { services } from "@/content/services";

export function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site Footer">
      <Container className="site-footer__grid">
        {/* Column 1: Company Profile & Credentials */}
        <section className="site-footer__about" aria-labelledby="footer-company">
          <span className="site-footer__badge">
            Specialist Geotechnical Contractor
          </span>
          <h2 id="footer-company">{company.name}</h2>
          <p style={{ maxWidth: "26rem", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.72)", lineHeight: 1.6 }}>
            Specialist geotechnical engineering and construction solutions for slopes, ground improvement, foundations and underground works in the Sultanate of Oman.
          </p>

          <div className="site-footer__meta-box">
            <div>
              <strong style={{ color: "rgba(255, 255, 255, 0.9)" }}>CR Number:</strong> {company.crNumber}
            </div>
            <div>
              <strong style={{ color: "rgba(255, 255, 255, 0.9)" }}>Registered HQ:</strong> Muscat, Oman
            </div>
            <div>
              <strong style={{ color: "rgba(255, 255, 255, 0.9)" }}>GPS:</strong> {company.coordinates}
            </div>
          </div>
        </section>

        {/* Column 2: Specialist Disciplines */}
        <section aria-labelledby="footer-disciplines">
          <h3 id="footer-disciplines">Disciplines</h3>
          <ul className="footer-links">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Column 3: Navigation & Governance */}
        <section aria-labelledby="footer-navigation">
          <h3 id="footer-navigation">Navigation</h3>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
          </ul>

          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.5, margin: 0 }}>
              Operating across Buraimi, Musandam, Nizwa, Al Sharqiyah and Muscat.
            </p>
          </div>
        </section>

        {/* Column 4: Muscat Head Office & Direct Channels */}
        <section aria-labelledby="footer-contact">
          <h3 id="footer-contact">Muscat Office</h3>
          <address style={{ color: "rgba(255, 255, 255, 0.72)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            {company.address.line1}
            <br />
            {company.address.line2}
            <br />
            {company.address.postal}
            <br />
            {company.address.city}, {company.address.country}
          </address>

          <div className="site-footer__contact-list">
            <a className="site-footer__contact-item" href={`tel:${company.phoneHref}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{company.phone}</span>
            </a>
            <a
              className="site-footer__contact-item site-footer__contact-item--whatsapp"
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp ${company.whatsapp}`}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
  <path fill="#25D366" d="M16 3C8.82 3 3 8.82 3 16c0 2.55.73 4.93 2 6.96L3.2 29l6.23-1.76A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
  <path fill="#FFFFFF" d="M21.9 19.34c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.18.26-.68.86-.83 1.03-.15.17-.31.2-.57.07-.26-.13-1.11-.41-2.11-1.3-.78-.7-1.31-1.56-1.47-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.17-.5-.3z"/>
</svg>
              <span>WhatsApp Direct</span>
            </a>
            <a className="site-footer__contact-item" href={`mailto:${company.email}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{company.email}</span>
            </a>
          </div>
        </section>
      </Container>

      <div className="site-footer__bottom">
        <Container className="site-footer__bottom-inner">
          <span>
            © {currentYear} {company.name}. All rights reserved. Commercial Registration No. {company.crNumber}.
          </span>
          <span>
            Specialist Geotechnical Design & Execution · Muscat, Sultanate of Oman
          </span>
        </Container>
      </div>
    </footer>
  );
}
