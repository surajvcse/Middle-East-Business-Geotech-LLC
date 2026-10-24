"use client";

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
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=23.5880,58.4059`;
  const appleMapsUrl = `https://maps.apple.com/?ll=23.5880,58.4059&q=Middle+East+Business+Geotech+LLC`;

  return (
    <div className={`headquarters-map-card ${className}`}>
      {/* Real Interactive Leaflet Map for Muscat HQ (Same reliable engine as About page) */}
      <RealLeafletMap
        mode="single"
        singleLocationId="muscat-hq"
        height="350px"
        showSidebar={false}
      />

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
