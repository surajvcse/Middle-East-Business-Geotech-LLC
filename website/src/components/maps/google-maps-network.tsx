"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { OMAN_OPERATIONAL_LOCATIONS, type MapLocation } from "./real-leaflet-map";

type GoogleMapsNetworkProps = {
  apiKey: string;
  height?: string;
  showSidebar?: boolean;
  onFallbackNeeded?: () => void;
};

// Global script loading promise cache to avoid multi-injecting
let googleMapsScriptPromise: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }
  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    // Check if script element already exists
    const existing = document.getElementById("google-maps-js");
    if (existing) {
      if (window.google?.maps) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", (e) => reject(e));
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey.trim()
    )}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => {
      googleMapsScriptPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
}

export function GoogleMapsNetwork({
  apiKey,
  height = "520px",
  showSidebar = true,
  onFallbackNeeded,
}: GoogleMapsNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("muscat-hq");

  const selectedLoc =
    OMAN_OPERATIONAL_LOCATIONS.find((loc) => loc.id === selectedId) ||
    OMAN_OPERATIONAL_LOCATIONS[0];

  useEffect(() => {
    let isCancelled = false;

    async function init() {
      if (!apiKey || apiKey.trim() === "") {
        onFallbackNeeded?.();
        return;
      }

      try {
        setIsLoading(true);
        await loadGoogleMaps(apiKey);

        if (isCancelled || !containerRef.current || !window.google?.maps) {
          return;
        }

        const omanCenter = { lat: 24.2, lng: 57.5 };

        const map = new google.maps.Map(containerRef.current, {
          center: omanCenter,
          zoom: 7,
          minZoom: 5,
          maxZoom: 19,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          fullscreenControl: true,
        });

        const infoWindow = new google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        // Custom styled marker pins
        const newMarkers: { [key: string]: google.maps.Marker } = {};

        OMAN_OPERATIONAL_LOCATIONS.forEach((loc) => {
          const isHq = loc.category === "Headquarters";

          const marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map,
            title: loc.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: isHq ? 9 : 7,
              fillColor: isHq ? "#0A2239" : "#D96B2B",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2.5,
            },
          });

          const contentString = `
            <div style="font-family: inherit; padding: 6px 4px; max-width: 260px; color: #202830;">
              <span style="display:inline-block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:2px 6px; background:${
                isHq ? "#0A2239" : "#477694"
              }; color:#fff; border-radius:3px; margin-bottom:6px;">
                ${loc.category}
              </span>
              <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #0A2239; line-height: 1.3;">
                ${loc.name}
              </h4>
              <p style="margin: 0 0 4px; font-size: 11px; color: #5F6972;">
                ${loc.region} · ${loc.coordinates}
              </p>
              <p style="margin: 0 0 8px; font-size: 12px; line-height: 1.4; color: #333;">
                ${loc.scope}
              </p>
              ${
                loc.projectSlug
                  ? `<a href="/projects/${loc.projectSlug}" style="display:inline-block; font-size:11px; font-weight:700; color:#D96B2B; text-decoration:none;">View Project Record &rarr;</a>`
                  : ""
              }
            </div>
          `;

          marker.addListener("click", () => {
            setSelectedId(loc.id);
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
          });

          newMarkers[loc.id] = marker;
        });

        markersRef.current = newMarkers;
        mapRef.current = map;
        setIsLoading(false);
      } catch (err) {
        console.warn("Failed to load Google Maps SDK:", err);
        setLoadError("Failed to initialize Google Maps. Falling back to Cartographic map.");
        setIsLoading(false);
        onFallbackNeeded?.();
      }
    }

    init();

    return () => {
      isCancelled = true;
    };
  }, [apiKey, onFallbackNeeded]);

  // Pan to location
  const panToSite = (loc: MapLocation) => {
    setSelectedId(loc.id);
    const map = mapRef.current;
    if (!map) return;

    map.panTo({ lat: loc.lat, lng: loc.lng });
    map.setZoom(loc.zoom || 13);

    const marker = markersRef.current[loc.id];
    const infoWindow = infoWindowRef.current;
    if (marker && infoWindow) {
      infoWindow.setContent(`
        <div style="font-family: inherit; padding: 6px 4px; max-width: 260px; color: #202830;">
          <span style="display:inline-block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:2px 6px; background:${
            loc.category === "Headquarters" ? "#0A2239" : "#477694"
          }; color:#fff; border-radius:3px; margin-bottom:6px;">
            ${loc.category}
          </span>
          <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #0A2239; line-height: 1.3;">
            ${loc.name}
          </h4>
          <p style="margin: 0 0 4px; font-size: 11px; color: #5F6972;">
            ${loc.region} · ${loc.coordinates}
          </p>
          <p style="margin: 0 0 8px; font-size: 12px; line-height: 1.4; color: #333;">
            ${loc.scope}
          </p>
          ${
            loc.projectSlug
              ? `<a href="/projects/${loc.projectSlug}" style="display:inline-block; font-size:11px; font-weight:700; color:#D96B2B; text-decoration:none;">View Project Record &rarr;</a>`
              : ""
          }
        </div>
      `);
      infoWindow.open(map, marker);
    }
  };

  const resetToOman = () => {
    const map = mapRef.current;
    if (!map) return;
    map.panTo({ lat: 24.2, lng: 57.5 });
    map.setZoom(7);
  };

  return (
    <div className="real-map-wrapper">
      {/* Top Map Toolbar */}
      <div className="real-map-toolbar">
        <div className="real-map-toolbar__status">
          <span className="real-map-toolbar__live-dot" aria-hidden="true" />
          <span className="real-map-toolbar__status-text">
            Google Maps Platform Network
          </span>
          <span className="badge badge--steel" style={{ marginLeft: "0.5rem" }}>
            {selectedLoc.coordinates}
          </span>
          <span
            className="badge badge--navy"
            style={{ marginLeft: "0.35rem", fontSize: "0.6875rem" }}
            title="Live Google Maps JavaScript API via .env"
          >
            Google Maps API
          </span>
        </div>

        <div className="real-map-toolbar__actions">
          <button
            type="button"
            onClick={resetToOman}
            className="real-map-toolbar__btn"
            title="Reset view to full Sultanate of Oman"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            </svg>
            <span>Fit Oman</span>
          </button>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`}
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

      {/* Main Map Body: Canvas + Sidebar */}
      <div className={`real-map-layout ${!showSidebar ? "real-map-layout--no-sidebar" : ""}`}>
        {/* Google Map Container */}
        <div className="real-map-frame" style={{ height, position: "relative" }}>
          {isLoading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--canvas)",
                zIndex: 2,
                gap: "0.75rem",
              }}
            >
              <span className="badge badge--steel">Loading Google Maps Platform...</span>
            </div>
          )}

          {loadError && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--canvas)",
                color: "var(--muted)",
                padding: "2rem",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <p>{loadError}</p>
            </div>
          )}

          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Sidebar Info Card & Quick Locations */}
        {showSidebar && (
          <div className="real-map-sidebar">
            <div className="real-map-spotlight">
              <div className="real-map-spotlight__head">
                <span
                  className={`badge ${
                    selectedLoc.category === "Headquarters"
                      ? "badge--navy"
                      : "badge--steel"
                  }`}
                >
                  {selectedLoc.category}
                </span>
                <span className="real-map-spotlight__coords">
                  {selectedLoc.coordinates}
                </span>
              </div>

              <h4 className="real-map-spotlight__title">{selectedLoc.name}</h4>
              <p className="real-map-spotlight__region">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{selectedLoc.region} · Sultanate of Oman</span>
              </p>

              {selectedLoc.terrain && (
                <div className="real-map-spotlight__row">
                  <span className="real-map-spotlight__label">
                    Geological Terrain / Site Role:
                  </span>
                  <p className="real-map-spotlight__text">{selectedLoc.terrain}</p>
                </div>
              )}

              <div className="real-map-spotlight__row">
                <span className="real-map-spotlight__label">
                  Specialist Engineering Scope:
                </span>
                <p className="real-map-spotlight__text">{selectedLoc.scope}</p>
              </div>

              {selectedLoc.projectSlug && (
                <div style={{ marginTop: "1rem" }}>
                  <Link
                    href={`/projects/${selectedLoc.projectSlug}`}
                    className="button-link button-link--primary button-link--sm"
                  >
                    <span>View Project Evidence Record</span>
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
                  </Link>
                </div>
              )}
            </div>

            <div className="real-map-loc-list">
              <span className="real-map-loc-list__label">Click to Pan to Site:</span>
              <div className="real-map-loc-list__items">
                {OMAN_OPERATIONAL_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === selectedId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => panToSite(loc)}
                      className={`real-map-loc-btn ${isSelected ? "is-selected" : ""}`}
                    >
                      <span className="real-map-loc-btn__dot" />
                      <span className="real-map-loc-btn__name">{loc.name}</span>
                      <span className="real-map-loc-btn__region">
                        {loc.category === "Headquarters"
                          ? "HQ"
                          : loc.region.replace(" Governorate", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

