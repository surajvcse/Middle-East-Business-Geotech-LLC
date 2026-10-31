"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/content";

type ProjectsDirectoryProps = {
  projects: readonly Project[];
};

type SectorFilter = "all" | "transport" | "water";
type ViewMode = "cards" | "table";

export function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<SectorFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "transport") {
      return projects.filter(
        (p) =>
          p.sector?.toLowerCase().includes("transport") ||
          p.sector?.toLowerCase().includes("road") ||
          p.sector?.toLowerCase().includes("expressway") ||
          p.slug.includes("road")
      );
    }
    if (activeFilter === "water") {
      return projects.filter(
        (p) =>
          p.sector?.toLowerCase().includes("water") ||
          p.sector?.toLowerCase().includes("utility") ||
          p.slug.includes("water") ||
          p.slug.includes("manah") ||
          p.slug.includes("sharqiyah-region")
      );
    }
    return projects;
  }, [projects, activeFilter]);

  const ongoingCount = projects.filter((p) => p.documentStatus.includes("Ongoing")).length;
  const completedCount = projects.filter((p) => p.documentStatus.includes("Completed")).length;
  const transportCount = projects.filter(
    (p) =>
      p.sector?.toLowerCase().includes("transport") ||
      p.sector?.toLowerCase().includes("road") ||
      p.sector?.toLowerCase().includes("expressway") ||
      p.slug.includes("road")
  ).length;
  const waterCount = projects.filter(
    (p) =>
      p.sector?.toLowerCase().includes("water") ||
      p.sector?.toLowerCase().includes("utility") ||
      p.slug.includes("water") ||
      p.slug.includes("manah") ||
      p.slug.includes("sharqiyah-region")
  ).length;

  return (
    <div className="projects-directory">
      {/* 1. PORTFOLIO METRICS AT A GLANCE */}
      <div className="projects-metrics-bar" aria-label="Portfolio summary metrics">
        <div className="projects-metric-box">
          <span className="projects-metric-number">5</span>
          <span className="projects-metric-label">Verified Packages</span>
          <span className="projects-metric-sub">{ongoingCount} Active · {completedCount} Delivered</span>
        </div>
        <div className="projects-metric-box">
          <span className="projects-metric-number">4</span>
          <span className="projects-metric-label">Oman Governorates</span>
          <span className="projects-metric-sub">Musandam, Buraimi, Nizwa, Sharqiyah</span>
        </div>
        <div className="projects-metric-box">
          <span className="projects-metric-number">Tier-1</span>
          <span className="projects-metric-label">Client Approvals</span>
          <span className="projects-metric-sub">MTCIT, NAMA, Al Tasnim, Sarooj, Towell</span>
        </div>
        <div className="projects-metric-box">
          <span className="projects-metric-number">100%</span>
          <span className="projects-metric-label">In-House Quality Sign-Off</span>
          <span className="projects-metric-sub">Hydraulic Pull Tests & Grout Logs</span>
        </div>
      </div>

      {/* 2. FILTER & CONTROLS TOOLBAR */}
      <div className="projects-toolbar">
        <div className="projects-filter-group" role="tablist" aria-label="Filter projects by infrastructure sector">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "all"}
            className={`projects-filter-btn ${activeFilter === "all" ? "projects-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Infrastructure Packages <span className="projects-filter-count">{projects.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "transport"}
            className={`projects-filter-btn ${activeFilter === "transport" ? "projects-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("transport")}
          >
            Roads & Highway Corridors <span className="projects-filter-count">{transportCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "water"}
            className={`projects-filter-btn ${activeFilter === "water" ? "projects-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("water")}
          >
            Water & Utility Networks <span className="projects-filter-count">{waterCount}</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="projects-view-toggle" role="group" aria-label="Switch display view">
          <button
            type="button"
            className={`projects-view-btn ${viewMode === "cards" ? "projects-view-btn--active" : ""}`}
            onClick={() => setViewMode("cards")}
            aria-label="Card view"
            title="Card View"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Detailed Cards</span>
          </button>
          <button
            type="button"
            className={`projects-view-btn ${viewMode === "table" ? "projects-view-btn--active" : ""}`}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
            title="Summary Table"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Summary Table</span>
          </button>
        </div>
      </div>

      {/* 3. CONTENT VIEW */}
      {viewMode === "cards" ? (
        <div className="projects-cards-list" role="region" aria-label="Project Cards">
          {filteredProjects.map((project, index) => {
            const isOngoing = project.documentStatus.includes("Ongoing");
            const image = project.images[0];

            return (
              <article key={project.slug} className="project-detail-card">
                <div className="project-detail-card__media">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="project-detail-card__image-wrap"
                    aria-label={`View full project record for ${project.shortTitle}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 64rem) 100vw, 480px"
                      priority={index < 2}
                    />
                    <div className="project-detail-card__badge-overlay">
                      <span className={`badge ${isOngoing ? "badge--accent" : "badge--verified"}`}>
                        {isOngoing ? "Active Delivery Package" : "Completed & Verified"}
                      </span>
                    </div>
                  </Link>

                  {project.quickStat ? (
                    <div className="project-detail-card__stat-callout">
                      <span className="project-detail-card__stat-tag">Deployment Highlight</span>
                      <strong>{project.quickStat}</strong>
                    </div>
                  ) : null}
                </div>

                <div className="project-detail-card__content">
                  <div className="project-detail-card__header">
                    <div className="project-detail-card__meta">
                      <span className="project-detail-card__location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {project.location}
                      </span>
                      {project.sector ? (
                        <span className="project-detail-card__sector-pill">
                          {project.sector}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="project-detail-card__title">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>

                    <div className="project-detail-card__client-bar">
                      <span className="project-detail-card__client-label">Authority & Main Contractor:</span>
                      <strong className="project-detail-card__client-name">{project.client}</strong>
                    </div>
                  </div>

                  {/* Plain Language Explanations */}
                  <div className="project-detail-card__explanation-grid">
                    {project.challenge ? (
                      <div className="project-explanation-block project-explanation-block--challenge">
                        <div className="project-explanation-block__label">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          The Terrain Challenge
                        </div>
                        <p>{project.challenge}</p>
                      </div>
                    ) : null}

                    {project.solution ? (
                      <div className="project-explanation-block project-explanation-block--solution">
                        <div className="project-explanation-block__label">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Delivered Geotechnical Scope
                        </div>
                        <p>{project.solution}</p>
                      </div>
                    ) : (
                      <div className="project-explanation-block project-explanation-block--solution">
                        <div className="project-explanation-block__label">Delivered Scope</div>
                        <p>{project.scope}</p>
                      </div>
                    )}
                  </div>

                  {/* Technique Badges */}
                  {project.keyTechniques && project.keyTechniques.length > 0 ? (
                    <div className="project-detail-card__techniques">
                      <span className="project-detail-card__techniques-label">Methods Deployed:</span>
                      <div className="project-detail-card__techniques-list">
                        {project.keyTechniques.map((tech) => (
                          <span key={tech} className="technique-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="project-detail-card__footer">
                    <Link className="btn btn--secondary btn--sm" href={`/projects/${project.slug}`}>
                      View Details <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW FOR INSTANT SCANNING */
        <div className="projects-table-container" role="region" aria-label="Projects comparison table">
          <table className="projects-summary-table">
            <thead>
              <tr>
                <th scope="col">Project Title</th>
                <th scope="col">Location & Governorate</th>
                <th scope="col">Infrastructure Sector</th>
                <th scope="col">Client / EPC Main Contractor</th>
                <th scope="col">Core Scope & Methods</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.slug}>
                  <td className="table-col-title">
                    <Link href={`/projects/${project.slug}`}>
                      <strong>{project.shortTitle}</strong>
                    </Link>
                  </td>
                  <td>{project.location}</td>
                  <td>
                    <span className="table-sector-badge">{project.sector}</span>
                  </td>
                  <td>{project.client}</td>
                  <td className="table-col-scope">
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-deep)" }}>
                      {project.scope}
                    </p>
                  </td>
                  <td>
                    <span className={`badge ${project.documentStatus.includes("Ongoing") ? "badge--accent" : "badge--verified"}`}>
                      {project.documentStatus.includes("Ongoing") ? "Active Package" : "Completed"}
                    </span>
                  </td>
                  <td>
                    <Link className="text-link" href={`/projects/${project.slug}`}>
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. INTEGRITY & VERIFICATION FOOTNOTE */}
      <div className="projects-integrity-box">
        <div className="projects-integrity-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <div className="projects-integrity-text">
          <strong>Documented Source Records & Quality Integrity:</strong>
          <span>
            {" "}Project details and operational statuses are transcribed directly from MEB Geotech company contract archives and verified engineering sign-offs. Site photography reflects real mobilization across Buraimi, Musandam, Nizwa, and Al Sharqiyah in full compliance with Sultanate of Oman Ministry of Transport, Communications and IT (MTCIT) and NAMA Water Services engineering standards.
          </span>
        </div>
      </div>
    </div>
  );
}

