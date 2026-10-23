import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function ProjectNotFound() {
  return (
    <section className="content-section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Container style={{ textAlign: "center", maxWidth: "36rem" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>{"// PROJECT NOT FOUND"}</p>
        <h1 style={{ marginInline: "auto", marginBottom: "1rem" }}>Project Record Unavailable</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          The requested infrastructure project record is not found. Explore our documented project cases in Oman.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <ButtonLink href="/projects" variant="primary">View All Projects</ButtonLink>
          <ButtonLink href="/" variant="steel">Return Home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
