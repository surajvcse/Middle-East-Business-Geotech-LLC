"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Project } from "@/types/content";

const SLIDE_DURATION_MS = 3800;

type HeroProjectSliderProps = {
  projects: readonly Project[];
};

function getHeroObjectPosition(slug: string): string {
  if (slug === "khasab-lima-road") {
    return "center 22%";
  }
  return "center center";
}

function getProjectSectorBadge(project: Project): string {
  if (project.slug === "al-ubaidah-fayyad-road") return "Slope Protection";
  if (project.slug === "khasab-lima-road") return "Sea-Cliff Stabilisation";
  if (project.slug === "wilayat-manah") return "Water Network Protection";
  if (project.slug === "al-kamil-sur-road") return "Highway Slope Protection";
  if (project.slug === "al-sharqiyah-region") return "Rock Bolting & Mesh";
  return project.sector || "Specialist Works";
}

export function HeroProjectSlider({ projects }: HeroProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer with pause on hover/focus & respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || total <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, total, currentIndex]);

  // Keyboard navigation when slider is focused
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevSlide();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }
  };

  const currentProject = projects[currentIndex] ?? projects[0];

  return (
    <div className="hero__visual-wrap">
      <div
        ref={containerRef}
        className={`hero-slider ${isPaused ? "is-paused" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Verified Geotechnical Infrastructure Projects in Oman"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* All Slides with Cross-Fade & Gentle Ken-Burns Settle */}
        <div className="hero-slider__slides">
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const primaryImage =
              project.slug === "al-sharqiyah-region" && project.images[1]
                ? project.images[1]
                : project.images[0];

            return (
              <div
                key={project.slug}
                className={`hero-slider__slide ${
                  isActive ? "hero-slider__slide--active" : ""
                }`}
                aria-hidden={!isActive}
              >
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  sizes="(max-width: 64rem) 100vw, 48vw"
                  priority={index === 0}
                  style={{
                    objectPosition: getHeroObjectPosition(project.slug),
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Top Header Overlay Bar with Controls */}
        <div className="hero-slider__top-bar">
          <div />

          {/* Slider Prev / Next Controls */}
          <div className="hero-slider__controls" aria-label="Slide controls">
            <button
              type="button"
              className="hero-slider__nav-btn"
              onClick={prevSlide}
              aria-label="Previous project slide"
              title="Previous project"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-slider__nav-btn"
              onClick={nextSlide}
              aria-label="Next project slide"
              title="Next project"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="hero-slider__caption">
          <div className="hero-slider__caption-main">
            <div>
              <Link
                href={`/projects/${currentProject.slug}`}
                className="hero-slider__title-link"
              >
                <span className="hero-slider__title">
                  {currentProject.shortTitle}
                </span>
                <svg
                  width="13"
                  height="13"
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
              <p className="hero-slider__location">
                {currentProject.location}
                {currentProject.governorate
                  ? ` · ${currentProject.governorate} Gov.`
                  : ""}
              </p>
            </div>

            <span
              className="badge badge--steel hero-slider__badge"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                color: "var(--navy-deep)",
                fontWeight: 700,
              }}
            >
              {getProjectSectorBadge(currentProject)}
            </span>
          </div>

          {/* Animated Progress Indicators */}
          <div
            className="hero-slider__progress"
            role="tablist"
            aria-label="Project slide selection"
          >
            {projects.map((project, index) => {
              const isSelected = index === currentIndex;
              const isPast = index < currentIndex;

              return (
                <button
                  key={project.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Jump to slide ${index + 1}: ${project.shortTitle}`}
                  className={`hero-slider__progress-segment ${
                    isSelected ? "hero-slider__progress-segment--active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <span className="hero-slider__progress-track">
                    <span
                      key={isSelected ? `active-${currentIndex}` : `idle-${index}`}
                      className={`hero-slider__progress-fill ${
                        isPast ? "hero-slider__progress-fill--completed" : ""
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
