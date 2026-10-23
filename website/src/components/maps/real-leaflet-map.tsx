"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker, TileLayer as LeafletTileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GoogleMapsNetwork } from "./google-maps-network";

export type MapLocation = {
  id: string;
  name: string;
  category: "Headquarters" | "Active Project" | "Completed Project";
  region: string;
  coordinates: string;
  lat: number;
  lng: number;
  zoom?: number;
  description: string;
  scope: string;
  terrain?: string;
  projectSlug?: string;
};

export const OMAN_OPERATIONAL_LOCATIONS: MapLocation[] = [
  {
    id: "muscat-hq",
    name: "Muscat Central Operations & HQ",
    category: "Headquarters",
    region: "Muscat Governorate",
    coordinates: "23.5880° N, 58.4059° E",
    lat: 23.5880,
    lng: 58.4059,
    zoom: 15,
    description: "Flat 12/6, Building 1040, Way 3513, South Al Khuwair, Muscat. Central management, engineering coordination, and equipment mobilisation fleet depot.",
    scope: "Design coordination, core technical supervision, calibrated plant mobilisation & geotechnical QA/QC sign-off.",
    terrain: "Central Engineering Operations Depot & Office",
  },
  {
    id: "musandam-khasab",
    name: "Khasab to Lima Coastal Highway",
    category: "Active Project",
    region: "Musandam Governorate",
    coordinates: "26.1800° N, 56.2500° E",
    lat: 26.1800,
    lng: 56.2500,
    zoom: 13,
    description: "Strategic coastal transport corridor connecting Khasab and Lima along sheer sea cliffs in the Musandam Peninsula.",
    scope: "Pattern rock bolting, crane-suspended rope-access crews, reinforced shotcrete benches & high-tensile rockfall netting.",
    terrain: "Vertical limestone sea cliffs subject to wave undercutting and tectonic jointing.",
    projectSlug: "khasab-lima-road",
  },
  {
    id: "buraimi-road",
    name: "Al Ubaidah to Fayyad Road Cut",
    category: "Active Project",
    region: "Al Buraimi Governorate",
    coordinates: "24.2500° N, 55.7600° E",
    lat: 24.2500,
    lng: 55.7600,
    zoom: 13,
    description: "Heavy mountain road cuttings through fractured ophiolite and jointed bedrock formations.",
    scope: "High-tensile wire netting drapery, deep prestressed rock anchors, and permanent rockfall protection barriers.",
    terrain: "Steep fractured rock slopes prone to weathering and planar sliding.",
    projectSlug: "al-ubaidah-fayyad-road",
  },
  {
    id: "manah-pipeline",
    name: "Wilayat Manah Water Infrastructure",
    category: "Active Project",
    region: "Al Dakhiliyah Governorate",
    coordinates: "22.7800° N, 57.5900° E",
    lat: 22.7800,
    lng: 57.5900,
    zoom: 13,
    description: "Regional water transmission pipeline trench stabilization through variable desert gravels and karstic terrain.",
    scope: "Specialized trench shoring, void infill permeation grouting, and pipeline corridor slope protection.",
    terrain: "Unconsolidated gravel embankments and localized karstic cavities.",
    projectSlug: "wilayat-manah",
  },
  {
    id: "sharqiyah-highway",
    name: "Al Kamil to Sur Highway Corridor",
    category: "Completed Project",
    region: "Ash Sharqiyah South Governorate",
    coordinates: "22.5600° N, 59.5200° E",
    lat: 22.5600,
    lng: 59.5200,
    zoom: 13,
    description: "Multi-kilometer rock slope stabilization package along expressway cuttings leading to Sur.",
    scope: "Systematic rock bolting, anchored steel netting, pre-split slope scaling and geotechnical ditch retention.",
    terrain: "Weathered sedimentary rock cuttings along active high-speed transport corridor.",
    projectSlug: "al-kamil-sur-road",
  },
];

type RealLeafletMapProps = {
  mode?: "network" | "single";
  singleLocationId?: string;
  height?: string;
  showSidebar?: boolean;
};

const emptySubscribe = () => () => {};

export function RealLeafletMap({
  mode = "network",
  singleLocationId = "muscat-hq",
  height = "500px",
  showSidebar = true,
}: RealLeafletMapProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasGoogleKey = Boolean(googleApiKey && googleApiKey.trim() !== "");

  const [engine, setEngine] = useState<"google" | "leaflet">(
    hasGoogleKey && mode === "network" ? "google" : "leaflet"
  );

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const streetTileRef = useRef<LeafletTileLayer | null>(null);
  const satelliteTileRef = useRef<LeafletTileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: LeafletMarker }>({});

  const [activeLayer, setActiveLayer] = useState<"streets" | "satellite">("streets");
  const [selectedId, setSelectedId] = useState<string>(
    mode === "single" ? singleLocationId : "muscat-hq"
  );

  const selectedLoc =
    OMAN_OPERATIONAL_LOCATIONS.find((loc) => loc.id === selectedId) ||
    OMAN_OPERATIONAL_LOCATIONS[0];

  useEffect(() => {
    if (!isClient || engine !== "leaflet" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initial center: if single mode, zoom to that location; if network, show all Oman
      const initialLat = mode === "single" ? selectedLoc.lat : 24.2;
      const initialLng = mode === "single" ? selectedLoc.lng : 57.5;
      const initialZoom = mode === "single" ? (selectedLoc.zoom || 15) : 7;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: false,
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Tile layers
      const streetTile = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      );

      const satelliteTile = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 18,
        }
      );

      streetTileRef.current = streetTile;
      satelliteTileRef.current = satelliteTile;

      // Add default layer
      streetTile.addTo(map);

      // Markers
      const locationsToRender =
        mode === "single"
          ? [selectedLoc]
          : OMAN_OPERATIONAL_LOCATIONS;

      markersRef.current = {};

      locationsToRender.forEach((loc) => {
        const isHq = loc.category === "Headquarters";
        const iconHtml = `
          <div class="real-map-pin ${isHq ? "real-map-pin--hq" : "real-map-pin--site"} ${
          loc.id === selectedId ? "is-active" : ""
        }" id="pin-${loc.id}">
            <span class="real-map-pin__pulse"></span>
            <div class="real-map-pin__icon">
              ${
                isHq
                  ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
                  : `<span class="real-map-pin__dot"></span>`
              }
            </div>
            <span class="real-map-pin__label">${loc.name.split(" ")[0]}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "real-map-pin-wrapper",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div class="real-map-popup">
            <span class="real-map-popup__tag ${isHq ? "is-hq" : ""}">${loc.category}</span>
            <h4 class="real-map-popup__title">${loc.name}</h4>
            <p class="real-map-popup__region">${loc.region}</p>
            <p class="real-map-popup__coords">${loc.coordinates}</p>
            <p class="real-map-popup__desc">${loc.scope}</p>
            ${
              loc.projectSlug
                ? `<a href="/projects/${loc.projectSlug}" class="real-map-popup__link">View Project Record &rarr;</a>`
                : ""
            }
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          setSelectedId(loc.id);
        });

        markersRef.current[loc.id] = marker;
      });

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, mode]);

  // Handle Layer Switch
  const handleLayerSwitch = (layer: "streets" | "satellite") => {
    setActiveLayer(layer);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (layer === "satellite") {
      if (streetTileRef.current) map.removeLayer(streetTileRef.current);
      if (satelliteTileRef.current) map.addLayer(satelliteTileRef.current);
    } else {
      if (satelliteTileRef.current) map.removeLayer(satelliteTileRef.current);
      if (streetTileRef.current) map.addLayer(streetTileRef.current);
    }
  };

  // Fly to location when selected
  const flyToLocation = (loc: MapLocation) => {
    setSelectedId(loc.id);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo([loc.lat, loc.lng], loc.zoom || 14, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    const marker = markersRef.current[loc.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 1200);
    }
  };

  // Reset to full Oman view
  const resetToOman = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([24.2, 57.5], 7, { duration: 1.2 });
  };

  if (engine === "google" && hasGoogleKey && googleApiKey && mode === "network") {
    return (
      <GoogleMapsNetwork
        apiKey={googleApiKey}
        height={height}
        showSidebar={showSidebar}
        onFallbackNeeded={() => setEngine("leaflet")}
      />
    );
  }

  return (
    <div className="real-map-wrapper">
      {/* Map Control Toolbar */}
      <div className="real-map-toolbar">
        <div className="real-map-toolbar__status">
          <span className="real-map-toolbar__live-dot" aria-hidden="true" />
          <span className="real-map-toolbar__status-text">
            {mode === "single" ? "Muscat Headquarters Location" : "Real Cartographic Site Network"}
          </span>
          <span className="badge badge--steel" style={{ marginLeft: "0.5rem" }}>
            {selectedLoc.coordinates}
          </span>
        </div>

        <div className="real-map-toolbar__actions">
          {mode === "network" && (
            <button
              type="button"
              onClick={resetToOman}
              className="real-map-toolbar__btn"
              title="Reset view to full Sultanate of Oman"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              </svg>
              <span>Fit Oman</span>
            </button>
          )}

          {/* Layer Switcher: Street vs Satellite */}
          <div className="real-map-layer-switch">
            <button
              type="button"
              className={`real-map-layer-btn ${activeLayer === "streets" ? "is-active" : ""}`}
              onClick={() => handleLayerSwitch("streets")}
            >
              Road Map
            </button>
            <button
              type="button"
              className={`real-map-layer-btn ${activeLayer === "satellite" ? "is-active" : ""}`}
              onClick={() => handleLayerSwitch("satellite")}
            >
              Satellite
            </button>
          </div>

          {/* External Google Maps Link */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="real-map-toolbar__btn real-map-toolbar__btn--accent"
            title="Open in Google Maps application"
          >
            <span>Google Maps</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Map Body: Map Canvas + Sidebar */}
      <div className={`real-map-layout ${!showSidebar ? "real-map-layout--no-sidebar" : ""}`}>
        {/* Leaflet Map DOM Node */}
        <div className="real-map-frame" style={{ height }}>
          <div ref={mapContainerRef} className="real-map-element" />
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{selectedLoc.region} · Sultanate of Oman</span>
              </p>

              {selectedLoc.terrain && (
                <div className="real-map-spotlight__row">
                  <span className="real-map-spotlight__label">Geological Terrain / Site Role:</span>
                  <p className="real-map-spotlight__text">{selectedLoc.terrain}</p>
                </div>
              )}

              <div className="real-map-spotlight__row">
                <span className="real-map-spotlight__label">Specialist Engineering Scope:</span>
                <p className="real-map-spotlight__text">{selectedLoc.scope}</p>
              </div>

              {selectedLoc.projectSlug && (
                <div style={{ marginTop: "1rem" }}>
                  <Link
                    href={`/projects/${selectedLoc.projectSlug}`}
                    className="button-link button-link--primary button-link--sm"
                  >
                    <span>View Project Evidence Record</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {mode === "network" && (
              <div className="real-map-loc-list">
                <span className="real-map-loc-list__label">Click to Fly to Site:</span>
                <div className="real-map-loc-list__items">
                  {OMAN_OPERATIONAL_LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedId;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => flyToLocation(loc)}
                        className={`real-map-loc-btn ${isSelected ? "is-selected" : ""}`}
                      >
                        <span className="real-map-loc-btn__dot" />
                        <span className="real-map-loc-btn__name">{loc.name}</span>
                        <span className="real-map-loc-btn__region">
                          {loc.category === "Headquarters" ? "HQ" : loc.region.replace(" Governorate", "")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
