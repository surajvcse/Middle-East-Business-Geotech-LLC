import Link from "next/link";

import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__top">
        <span className="badge badge--steel">{service.category}</span>
        {typeof index === "number" ? (
          <span className="service-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} {"//"}
          </span>
        ) : null}
      </div>

      <h3>
        <Link href={`/services/${service.slug}`}>{service.title}</Link>
      </h3>

      <p>{service.summary}</p>

      {service.methods && service.methods.length > 0 ? (
        <div className="service-card__methods" aria-label="Key methods">
          {service.methods.slice(0, 3).map((method) => (
            <span key={method} className="service-card__method-tag">
              {method}
            </span>
          ))}
        </div>
      ) : null}

      <Link className="text-link" href={`/services/${service.slug}`}>
        Explore capability <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
