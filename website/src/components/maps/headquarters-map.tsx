"use client";

import { useState } from "react";
import { company } from "@/content/company";
import { RealLeafletMap } from "./real-leaflet-map";

type HeadquartersMapProps = {
  className?: string;
  showDetails?: boolean;
};

export function HeadquartersMap({
  className = "",
  showDetails = true,
}: HeadquartersMapProps) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapEngine, setMapEngine] = useState<"google" | "satellite">("google");

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=23.5880,58.4059`;
  const appleMapsUrl = `https://maps.apple.com/?ll=23.5880,58.4059&q=Middle+East+Business+Geotech+LLC`;

  // Google Maps Embed URL (uses API key if provided in .env / .env.local, otherwise direct embed)
  const googleEmbedSrc = googleApiKey && googleApiKey.trim() !== ""
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
        googleApiKey.trim()
      )}&q=23.5880,58.4059&zoom=15`
    : `https://maps.google.com/maps?q=23.5880,58.4059&z=15&output=embed`;

  return (
    <div className={`headquarters-map-card ${className}`}>
      {/* Top Map Engine Toolbar */}
      <div className="real-map-toolbar" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="real-map-toolbar__status">
          <span className="real-map-toolbar__live-dot" aria-hidden="true" />
          <span className="real-map-toolbar__status-text">
            South Al Khuwair HQ · Muscat
          </span>
          <span className="badge badge--steel" style={{ marginLeft: "0.5rem" }}>
            23.5880° N, 58.4059° E
          </span>
          {googleApiKey && googleApiKey.trim() !== "" && (
            <span
              className="badge badge--navy"
              style={{ marginLeft: "0.35rem", fontSize: "0.6875rem" }}
              title="Connected to Google Maps Platform API key in .env"
            >
              Google Maps API Active
            </span>
          )}
        </div>

        <div className="real-map-toolbar__actions">
          <div className="real-map-layer-switch">
            <button
              type="button"
              className={`real-map-layer-btn ${mapEngine === "google" ? "is-active" : ""}`}
              onClick={() => setMapEngine("google")}
              title="Display Google Maps view"
            >
              Google Map
            </button>
            <button
              type="button"
              className={`real-map-layer-btn ${mapEngine === "satellite" ? "is-active" : ""}`}
              onClick={() => setMapEngine("satellite")}
              title="Display High-Resolution Satellite view"
            >
              Satellite
            </button>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="real-map-toolbar__btn real-map-toolbar__btn--accent"
            title="Open in Google Maps application"
          >
            <span>Google Maps</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Map Content Area */}
      <div style={{ height: "340px", position: "relative", width: "100%", background: "var(--canvas)" }}>
        {mapEngine === "google" ? (
          <iframe
            src={googleEmbedSrc}
            width="100%"
            height="100%"
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Middle East Business Geotech LLC Muscat Headquarters Location"
            allowFullScreen
          />
        ) : (
          <RealLeafletMap
            mode="single"
            singleLocationId="muscat-hq"
            height="340px"
            showSidebar={false}
          />
        )}
      </div>

      {/* Map Footer & Directions Action */}
      {showDetails && (
        <div className="headquarters-map-card__footer">
          <div className="headquarters-map-card__address">
            <strong>{company.name}</strong>
            <span>{company.address.line1}, {company.address.line2}</span>
            <span>{company.address.city}, {company.address.country} · CR: {company.crNumber}</span>
          </div>

          <div className="headquarters-map-card__actions">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link button-link--primary button-link--sm"
            >
              <span>Get Directions</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link button-link--steel button-link--sm"
            >
              <span>Apple Maps</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
