import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MaskedTextReveal } from "@/components/ui/masked-text-reveal";
import { company } from "@/content/company";

type ContactCtaProps = {
  eyebrow?: string;
  title?: string;
  summary?: string;
};

export function ContactCta({
  eyebrow = "Project Consultation",
  title = "Discuss your ground conditions and infrastructure requirements.",
  summary = "Share your project location, site geology or tender scope with our engineering team in Muscat. We review drawings, borehole data and site constraints to develop practical geotechnical solutions.",
}: ContactCtaProps) {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <Container className="contact-cta__inner">
        <div className="contact-cta__content">
          <p className="eyebrow">{eyebrow}</p>
          <MaskedTextReveal
            as="h2"
            id="contact-cta-title"
            type="lines"
            stagger={0.09}
            trigger="scroll"
            scrollStart="top 85%"
          >
            {title}
          </MaskedTextReveal>
          <p>{summary}</p>
          <div className="contact-cta__channels">
            <a className="contact-cta__channel" href={`tel:${company.phoneHref}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{company.phone}</span>
            </a>
            <a className="contact-cta__channel" href={`mailto:${company.email}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{company.email}</span>
            </a>
          </div>
        </div>
        <div>
          <ButtonLink href="/contact" variant="primary">
            Request a consultation
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
