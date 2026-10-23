import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  summary: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  summary,
  breadcrumbs,
  actions,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={crumb.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {idx > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--navy-deep)", fontWeight: 600 }}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="page-hero__summary">{summary}</p>
        {actions ? <div style={{ marginTop: "2rem" }}>{actions}</div> : null}
      </Container>
    </section>
  );
}
