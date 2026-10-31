"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Service, ServiceCategory } from "@/types/content";

type ServicesDirectoryProps = {
  services: readonly Service[];
};

type CategoryFilter = "all" | ServiceCategory;
type ViewMode = "cards" | "guide";

export function ServicesDirectory({ services }: ServicesDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return services;
    return services.filter((s) => s.category === activeFilter);
  }, [services, activeFilter]);

  const slopeCount = services.filter((s) => s.category === "Slope Stabilization & Rockfall").length;
  const groutingCount = services.filter((s) => s.category === "Ground Improvement & Grouting").length;
  const pilingCount = services.filter((s) => s.category === "Piling & Deep Foundations").length;
  const undergroundCount = services.filter((s) => s.category === "Underground & Specialist Works").length;

  return (
    <div className="services-directory">
      {/* 1. CAPABILITIES AT A GLANCE (METRICS BAR) */}
      <div className="services-metrics-bar" aria-label="Capabilities overview metrics">
        <div className="services-metric-box">
          <span className="services-metric-number">8</span>
          <span className="services-metric-label">Specialist Disciplines</span>
          <span className="services-metric-sub">Slopes, Grouting, Piling & Underground</span>
        </div>
        <div className="services-metric-box">
          <span className="services-metric-number">Specialist</span>
          <span className="services-metric-label">Plant & Rig Fleet</span>
          <span className="services-metric-sub">Crawler Rigs, Suspended Cages, Grout Plants</span>
        </div>
        <div className="services-metric-box">
          <span className="services-metric-number">Proven</span>
          <span className="services-metric-label">Oman Field Experience</span>
          <span className="services-metric-sub">Musandam, Buraimi, Nizwa, Al Sharqiyah</span>
        </div>
        <div className="services-metric-box">
          <span className="services-metric-number">100%</span>
          <span className="services-metric-label">QA/QC Field Tested</span>
          <span className="services-metric-sub">Calibrated Pull Tests & Grout Core Logs</span>
        </div>
      </div>

      {/* 2. FILTER & VIEW CONTROLS */}
      <div className="services-toolbar">
        <div className="services-filter-group" role="tablist" aria-label="Filter services by discipline category">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "all"}
            className={`services-filter-btn ${activeFilter === "all" ? "services-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Disciplines <span className="services-filter-count">{services.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "Slope Stabilization & Rockfall"}
            className={`services-filter-btn ${activeFilter === "Slope Stabilization & Rockfall" ? "services-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("Slope Stabilization & Rockfall")}
          >
            Slope Stabilization & Rockfall <span className="services-filter-count">{slopeCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "Ground Improvement & Grouting"}
            className={`services-filter-btn ${activeFilter === "Ground Improvement & Grouting" ? "services-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("Ground Improvement & Grouting")}
          >
            Grouting & Ground Improvement <span className="services-filter-count">{groutingCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "Piling & Deep Foundations"}
            className={`services-filter-btn ${activeFilter === "Piling & Deep Foundations" ? "services-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("Piling & Deep Foundations")}
          >
            Piling & Deep Foundations <span className="services-filter-count">{pilingCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "Underground & Specialist Works"}
            className={`services-filter-btn ${activeFilter === "Underground & Specialist Works" ? "services-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter("Underground & Specialist Works")}
          >
            Underground & Remediation <span className="services-filter-count">{undergroundCount}</span>
          </button>
        </div>

        {/* View Switcher */}
        <div className="services-view-toggle" role="group" aria-label="Switch display view">
          <button
            type="button"
            className={`services-view-btn ${viewMode === "cards" ? "services-view-btn--active" : ""}`}
            onClick={() => setViewMode("cards")}
            aria-label="Cards view"
            title="Interactive Cards View"
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
            className={`services-view-btn ${viewMode === "guide" ? "services-view-btn--active" : ""}`}
            onClick={() => setViewMode("guide")}
            aria-label="Guide matrix view"
            title="Method Selection Matrix"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Method Selection Guide</span>
          </button>
        </div>
      </div>

      {/* 3. CONTENT DISPLAY */}
      {viewMode === "cards" ? (
        <div className="services-cards-grid" role="region" aria-label="Geotechnical Services">
          {filteredServices.map((service, index) => {
            const hasProjects = service.relatedProjectSlugs.length > 0;

            return (
              <article key={service.slug} className="service-card-enhanced">
                <div className="service-card-enhanced__top">
                  <span className="badge badge--steel">{service.category}</span>
                  <span className="service-card-enhanced__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="service-card-enhanced__title">
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h3>

                <p className="service-card-enhanced__summary">{service.summary}</p>

                {/* Target Geology in Oman */}
                {service.targetGeology ? (
                  <div className="service-card-enhanced__geology">
                    <span className="service-card-enhanced__geology-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                      Target Geology in Oman:
                    </span>
                    <p>{service.targetGeology}</p>
                  </div>
                ) : null}

                {/* Core Methods Deployed */}
                {service.methods && service.methods.length > 0 ? (
                  <div className="service-card-enhanced__methods">
                    <span className="service-card-enhanced__methods-label">Methods Deployed:</span>
                    <div className="service-card-enhanced__methods-list">
                      {service.methods.slice(0, 3).map((method) => (
                        <span key={method} className="technique-pill">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Field Deployment Badge */}
                <div className="service-card-enhanced__deployment">
                  {hasProjects ? (
                    <span className="service-deploy-pill service-deploy-pill--verified">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Verified on {service.relatedProjectSlugs.length} Oman Infrastructure Projects
                    </span>
                  ) : (
                    <span className="service-deploy-pill service-deploy-pill--available">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Specialist Rig Fleet & Design-Build Available
                    </span>
                  )}
                </div>

                <div className="service-card-enhanced__footer">
                  <Link className="btn btn--secondary btn--sm" href={`/services/${service.slug}`}>
                    View Details <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* METHOD SELECTION GUIDE (MATRIX VIEW) */
        <div className="services-table-container" role="region" aria-label="Method selection guide matrix">
          <table className="services-matrix-table">
            <thead>
              <tr>
                <th scope="col">Specialist Discipline</th>
                <th scope="col">Category</th>
                <th scope="col">Target Oman Ground Condition</th>
                <th scope="col">Primary Execution Methods</th>
                <th scope="col">Field QA/QC & Verification</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.slug}>
                  <td className="matrix-col-title">
                    <Link href={`/services/${service.slug}`}>
                      <strong>{service.title}</strong>
                    </Link>
                  </td>
                  <td>
                    <span className="matrix-cat-badge">{service.category}</span>
                  </td>
                  <td className="matrix-col-geology">
                    {service.targetGeology || "Rugged rock cuttings and civil infrastructure"}
                  </td>
                  <td className="matrix-col-methods">
                    {service.methods ? service.methods.slice(0, 3).join(" · ") : "Specialist execution"}
                  </td>
                  <td className="matrix-col-testing">
                    {service.fieldTesting || "Proof load testing & certified sign-off"}
                  </td>
                  <td>
                    <Link className="text-link" href={`/services/${service.slug}`}>
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

