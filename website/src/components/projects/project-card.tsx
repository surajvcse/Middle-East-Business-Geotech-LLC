import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const image = project.images[0];
  const isOngoing = project.documentStatus.includes("Ongoing");

  return (
    <article className="project-card">
      <Link
        className="project-card__image"
        href={`/projects/${project.slug}`}
        aria-label={`View project details for ${project.shortTitle}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 58rem) 100vw, 50vw"
          priority={priority}
        />
        <div className="project-card__badge-overlay">
          <span className={`badge ${isOngoing ? "badge--accent" : "badge--verified"}`}>
            {project.documentStatus}
          </span>
        </div>
      </Link>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.location}</span>
          {project.sector ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.sector}</span>
            </>
          ) : null}
        </div>

        <h3>
          <Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link>
        </h3>

        <div className="project-card__client">
          <span style={{ color: "var(--muted-light)" }}>Client:</span>
          <span>{project.client}</span>
        </div>

        <p className="project-card__scope">{project.scope}</p>

        <Link className="text-link" href={`/projects/${project.slug}`}>
          View Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
