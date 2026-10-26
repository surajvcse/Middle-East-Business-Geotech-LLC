"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/site-path";
import type { Service } from "@/types/content";

const SERVICE_IMAGES: Record<string, string> = {
  "slope-stabilisation": withBasePath("/images/projects/al-ubaidah-fayyad-road-01.jpeg"),
  "ground-anchors-and-rock-bolting": withBasePath("/images/projects/khasab-lima-road-01.jpeg"),
  "shotcrete-and-wire-netting": withBasePath("/images/projects/al-kamil-sur-road-01.png"),
  "rockfall-protection": withBasePath("/images/projects/khasab-lima-road-02.jpeg"),
  "ground-improvement-and-grouting": withBasePath("/images/projects/wilayat-manah-01.jpeg"),
  "piling-and-foundation-engineering": withBasePath("/images/projects/al-sharqiyah-region-01.png"),
};

const SERVICE_SHORT_TITLES: Record<string, string> = {
  "slope-stabilisation": "Slope Stabilisation",
  "ground-anchors-and-rock-bolting": "Ground Anchors & Bolting",
  "shotcrete-and-wire-netting": "Shotcrete & Netting",
  "rockfall-protection": "Rockfall Protection",
  "ground-improvement-and-grouting": "Ground Improvement",
  "piling-and-foundation-engineering": "Piling & Foundations",
};

type ServicesInteractiveAccordionProps = {
  services: readonly Service[];
};

export function ServicesInteractiveAccordion({ services }: ServicesInteractiveAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % services.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    }
  };

  return (
    <div
      id="services-accordion-root"
      className="services-accordion"
      role="region"
      aria-label="Interactive core geotechnical disciplines"
    >
      {services.map((service, index) => {
        const isActive = index === activeIndex;
        const imageSrc = SERVICE_IMAGES[service.slug] || "/images/projects/al-ubaidah-fayyad-road-01.jpeg";
        const shortTitle = SERVICE_SHORT_TITLES[service.slug] || service.title;
        const numFormatted = String(index + 1).padStart(2, "0");

        return (
          <div
            key={service.slug}
            className={`services-accordion__panel ${
              isActive ? "services-accordion__panel--active" : "services-accordion__panel--compact"
            }`}
            style={{ position: "relative", overflow: "hidden" }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
            role="tab"
            aria-selected={isActive}
            aria-label={`${service.title} (${numFormatted})`}
          >
            {/* Background Image with Parallax Scale */}
            <div className="services-accordion__bg" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <Image
                src={imageSrc}
                alt=""
                fill
                className="services-accordion__img"
                sizes="(max-width: 900px) 100vw, 40vw"
                priority={index === 0}
              />
              <div className="services-accordion__overlay" />
            </div>

            {/* TOP BAR: Number and Category Badge */}
            <div className="services-accordion__top">
              <span className="services-accordion__num">
                {numFormatted}
              </span>
              {isActive && (
                <span className="services-accordion__category">
                  {service.category}
                </span>
              )}
            </div>

            {/* COMPACT STATE: Vertical Rotated Title Ribbon (Smooth Cross-Fade) */}
            <div
              className={`services-accordion__vertical-label ${
                isActive
                  ? "services-accordion__vertical-label--hidden"
                  : "services-accordion__vertical-label--visible"
              }`}
              aria-hidden={isActive}
            >
              <span className="services-accordion__vertical-text">
                {shortTitle}
              </span>
              <span className="services-accordion__expand-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </div>

            {/* ACTIVE STATE: Expanded Rich Card Content (Smooth Staggered Glide-In) */}
            <div
              className={`services-accordion__content ${
                isActive
                  ? "services-accordion__content--visible"
                  : "services-accordion__content--hidden"
              }`}
              aria-hidden={!isActive}
            >
              <div className="services-accordion__eyebrow">
                <span className="services-accordion__dot" />
                <span>SPECIALIST GEOTECHNICAL DISCIPLINE</span>
              </div>

              <h3 className="services-accordion__title">
                {service.title}
              </h3>

              <p className="services-accordion__summary">
                {service.summary}
              </p>

              {/* Key Methods Pills */}
              {service.methods && service.methods.length > 0 && (
                <div className="services-accordion__methods">
                  {service.methods.slice(0, 3).map((method) => (
                    <span key={method} className="services-accordion__method-pill">
                      {method}
                    </span>
                  ))}
                </div>
              )}

              {/* Action CTA Link */}
              <div className="services-accordion__footer">
                <Link
                  href={`/services/${service.slug}`}
                  className="services-accordion__cta-btn group"
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Explore capability details</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="services-accordion__cta-arrow"
                  >
                    <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                  </svg>
                </Link>

                <span className="services-accordion__active-hint">
                  Active discipline · Sultanate of Oman
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

