import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function ServiceNotFound() {
  return (
    <section className="content-section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Container style={{ textAlign: "center", maxWidth: "36rem" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>{"// SERVICE NOT FOUND"}</p>
        <h1 style={{ marginInline: "auto", marginBottom: "1rem" }}>Service Record Unavailable</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          The requested geotechnical capability page is not found. Explore our 8 core engineering disciplines in Oman.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <ButtonLink href="/services" variant="primary">View All Services</ButtonLink>
          <ButtonLink href="/" variant="steel">Return Home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
