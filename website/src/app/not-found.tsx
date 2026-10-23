import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="content-section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Container style={{ textAlign: "center", maxWidth: "36rem" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>{"// 404 ERROR"}</p>
        <h1 style={{ marginInline: "auto", marginBottom: "1rem" }}>Page Not Found</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          The requested engineering page or project record is not available. Please return to the homepage or explore our geotechnical services.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <ButtonLink href="/" variant="primary">Return to Homepage</ButtonLink>
          <ButtonLink href="/services" variant="steel">View Services</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

