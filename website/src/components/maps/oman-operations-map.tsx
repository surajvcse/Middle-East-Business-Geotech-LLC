"use client";

import Link from "next/link";
import { useState } from "react";
import { HeadquartersMap } from "./headquarters-map";

type DeploymentSite = {
  id: string;
  name: string;
  region: string;
  coordinates: string;
  terrain: string;
  scope: string;
  status: "Headquarters" | "Active Contract" | "Completed Package";
  projectSlug?: string;
  // Position percentage on the stylized Oman map (0-100)
  x: number;
  y: number;
};

const deploymentSites: DeploymentSite[] = [
  {
    id: "muscat",
    name: "Muscat Central Operations & HQ",
    region: "Muscat Governorate",
    coordinates: "23.5880° N, 58.4059° E",
    terrain: "Central Engineering Command & Specialist Rig Fleet Depot",
    scope: "Design coordination, core technical supervision, calibrated plant mobilization & geotechnical QA/QC.",
    status: "Headquarters",
    x: 77,
    y: 33,
  },
  {
    id: "musandam",
    name: "Khasab to Lima Coastal Highway",
    region: "Musandam Governorate",
    coordinates: "26.1800° N, 56.2500° E",
    terrain: "High-angle limestone sea cliffs with wave-cut undercut zones",
    scope: "Pattern rock bolting, crane-suspended rope-access crews, reinforced shotcrete benches & rockfall netting.",
    status: "Active Contract",
    projectSlug: "khasab-lima-road",
    x: 62,
    y: 5,
  },
  {
    id: "buraimi",
    name: "Al Ubaidah to Fayyad Road Cut",
    region: "Al Buraimi Governorate",
    coordinates: "24.2500° N, 55.7600° E",
    terrain: "Fractured ophiolite & jointed mountain cuttings along transport corridor",
    scope: "High-tensile wire netting drapery, deep prestressed rock anchors, and permanent rockfall protection barriers.",
    status: "Active Contract",
    projectSlug: "al-ubaidah-fayyad-road",
    x: 48,
    y: 24,
  },
  {
    id: "manah",
    name: "Wilayat Manah Water Infrastructure",
    region: "Al Dakhiliyah Governorate",
    coordinates: "22.7800° N, 57.5900° E",
    terrain: "Unstable trench embankments & karstified sedimentary gravel formations",
    scope: "Specialized shoring, void infill permeation grouting, and pipeline corridor geotechnical stabilisation.",
    status: "Active Contract",
    projectSlug: "wilayat-manah",
    x: 68,
    y: 47,
  },
  {
    id: "sharqiyah",
    name: "Al Kamil to Sur Highway Corridor",
    region: "Ash Sharqiyah South Governorate",
    coordinates: "22.5600° N, 59.5200° E",
    terrain: "Steep highway cutting through weathered sedimentary & chert bedrock",
    scope: "Rock bolting, anchored steel netting, pre-split slope scaling and geotechnical ditch retention.",
    status: "Completed Package",
    projectSlug: "al-kamil-sur-road",
    x: 88,
    y: 44,
  },
];

export function OmanOperationsMap() {
  const [activeSiteId, setActiveSiteId] = useState<string>("muscat");
  const [activeView, setActiveView] = useState<"oman" | "hq-map">("oman");

  const activeSite = deploymentSites.find((s) => s.id === activeSiteId) ?? deploymentSites[0];

  return (
    <div className="oman-map-section">
      {/* Top Header & View Toggle */}
      <div className="oman-map-section__header">
        <div>
          <span className="badge badge--steel" style={{ marginBottom: "0.5rem" }}>
            Geographic Coverage · Sultanate of Oman
          </span>
          <h3 className="oman-map-section__title">
            Engineering Reach & Strategic Deployments
          </h3>
          <p className="oman-map-section__desc">
            Dispatched from our Muscat headquarters to remote mountain passes, coastal sea cliffs, and regional utility trenches across the Sultanate.
          </p>
        </div>

        <div className="oman-map-toggle">
          <button
            type="button"
            className={`oman-map-toggle__btn ${activeView === "oman" ? "is-active" : ""}`}
            onClick={() => setActiveView("oman")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>Oman Site Network</span>
          </button>
          <button
            type="button"
            className={`oman-map-toggle__btn ${activeView === "hq-map" ? "is-active" : ""}`}
            onClick={() => setActiveView("hq-map")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Muscat HQ Street Map</span>
          </button>
        </div>
      </div>

      {activeView === "hq-map" ? (
        <HeadquartersMap showDetails={true} />
      ) : (
        <div className="oman-map-grid">
          {/* Visual Interactive Map Area */}
          <div className="oman-map-canvas">
            <div className="oman-map-canvas__inner">
              {/* Background Topographic Contour Grid */}
              <svg className="oman-map-topo" viewBox="0 0 500 500" aria-hidden="true">
                <defs>
                  <pattern id="topo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(10,34,57,0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topo-grid)" />

                {/* Stylized Coastline / Territory of Oman */}
                {/* Musandam Peninsula (Northern enclave) */}
                <path
                  d="M 290 20 C 310 15, 330 35, 320 60 C 310 80, 290 70, 290 20 Z"
                  fill="rgba(18, 52, 85, 0.08)"
                  stroke="var(--steel)"
                  strokeWidth="1.5"
                />
                {/* Main Oman Coastline & Territory */}
                <path
                  d="M 220 100 
                     C 260 90, 310 110, 360 145 
                     C 400 170, 440 210, 445 250 
                     C 430 280, 400 320, 360 360 
                     C 320 400, 270 440, 210 460 
                     C 180 440, 160 380, 170 320 
                     C 180 260, 190 200, 200 150 
                     Z"
                  fill="rgba(18, 52, 85, 0.06)"
                  stroke="var(--navy)"
                  strokeWidth="2"
                />

                {/* Water Body Accents */}
                <text x="370" y="80" fill="var(--steel-light)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                  GULF OF OMAN
                </text>
                <text x="390" y="380" fill="var(--steel-light)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                  ARABIAN SEA
                </text>
              </svg>

              {/* Interactive Deployment Pins */}
              {deploymentSites.map((site) => {
                const isSelected = site.id === activeSiteId;
                const isHq = site.status === "Headquarters";

                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setActiveSiteId(site.id)}
                    className={`oman-pin ${isSelected ? "is-active" : ""} ${isHq ? "oman-pin--hq" : ""}`}
                    style={{ left: `${site.x}%`, top: `${site.y}%` }}
                    aria-label={`View details for ${site.name} in ${site.region}`}
                  >
                    <span className="oman-pin__radar" aria-hidden="true" />
                    <span className="oman-pin__marker">
                      {isHq ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ) : (
                        <span className="oman-pin__core" />
                      )}
                    </span>
                    <span className="oman-pin__tag">
                      {site.region.replace(" Governorate", "")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Legend */}
            <div className="oman-map-legend">
              <span className="oman-map-legend__item">
                <span className="oman-map-legend__dot oman-map-legend__dot--hq" />
                <span>Headquarters & Yard (Muscat)</span>
              </span>
              <span className="oman-map-legend__item">
                <span className="oman-map-legend__dot oman-map-legend__dot--active" />
                <span>Active Infrastructure Sites</span>
              </span>
              <span className="oman-map-legend__item">
                <span className="oman-map-legend__dot oman-map-legend__dot--completed" />
                <span>Completed Civil Packages</span>
              </span>
            </div>
          </div>

          {/* Right Column: Site Detail Card & Quick Selector */}
          <div className="oman-map-details">
            {/* Active Site Spotlight Card */}
            <div className="oman-site-spotlight">
              <div className="oman-site-spotlight__header">
                <span
                  className={`badge ${
                    activeSite.status === "Headquarters"
                      ? "badge--navy"
                      : activeSite.status === "Active Contract"
                      ? "badge--steel"
                      : "badge"
                  }`}
                >
                  {activeSite.status}
                </span>
                <span className="oman-site-spotlight__coords">
                  {activeSite.coordinates}
                </span>
              </div>

              <h4 className="oman-site-spotlight__title">{activeSite.name}</h4>
              <p className="oman-site-spotlight__region">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{activeSite.region} · Sultanate of Oman</span>
              </p>

              <div className="oman-site-spotlight__section">
                <span className="oman-site-spotlight__label">Geological Terrain Challenge:</span>
                <p className="oman-site-spotlight__text">{activeSite.terrain}</p>
              </div>

              <div className="oman-site-spotlight__section">
                <span className="oman-site-spotlight__label">Specialist Engineering Scope:</span>
                <p className="oman-site-spotlight__text">{activeSite.scope}</p>
              </div>

              {activeSite.projectSlug && (
                <div style={{ marginTop: "1.25rem" }}>
                  <Link
                    href={`/projects/${activeSite.projectSlug}`}
                    className="button-link button-link--primary button-link--sm"
                  >
                    <span>View Project Evidence Record</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              )}

              {activeSite.id === "muscat" && (
                <div style={{ marginTop: "1.25rem" }}>
                  <button
                    type="button"
                    onClick={() => setActiveView("hq-map")}
                    className="button-link button-link--steel button-link--sm"
                  >
                    <span>View Muscat HQ Street Map</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Location Selector List */}
            <div className="oman-sites-nav">
              <span className="oman-sites-nav__label">Select Region to Inspect:</span>
              <ul className="oman-sites-nav__list">
                {deploymentSites.map((site) => (
                  <li key={site.id}>
                    <button
                      type="button"
                      className={`oman-sites-nav__item ${site.id === activeSiteId ? "is-selected" : ""}`}
                      onClick={() => setActiveSiteId(site.id)}
                    >
                      <span className="oman-sites-nav__dot" />
                      <span className="oman-sites-nav__name">{site.name}</span>
                      <span className="oman-sites-nav__status">{site.status === "Headquarters" ? "HQ" : site.region.replace(" Governorate", "")}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
