"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { company } from "@/content/company";
import type { Project } from "@/types/content";

const SLIDE_DURATION_MS = 3800;

const PROJECT_BG_POSITION: Record<string, string> = {
  "al-ubaidah-fayyad-road": "center 68%",
  "khasab-lima-road": "40% 55%",
  "wilayat-manah": "center 62%",
  "al-kamil-sur-road": "center 50%",
  "al-sharqiyah-region": "center 60%",
};

type HeroGlobeExpressProps = {
  projects: readonly Project[];
  company: typeof company;
};

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function HeroGlobeExpress({ projects, company }: HeroGlobeExpressProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const touchStartXRef = useRef<number | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const total = projects.length;
  const currentProject = projects[activeIndex] || projects[0];

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total);
      setProgress(0);
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  // Continuous Auto-play loop with wall-clock time tracking (never gets stuck or freezes)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let start = Date.now();
    let animId: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / SLIDE_DURATION_MS) * 100, 100);

      if (pct >= 100) {
        nextSlide();
        start = Date.now();
        setProgress(0);
      } else {
        setProgress(pct);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [nextSlide, prefersReducedMotion, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartXRef.current = null;
  };

  // Preview deck: Show upcoming projects starting after the active slide
  const previewCards = [];
  for (let i = 1; i < total; i++) {
    const cardIdx = (activeIndex + i) % total;
    previewCards.push({ project: projects[cardIdx], index: cardIdx });
  }

  return (
    <section
      className="hero-gx"
      aria-label="Geotechnical Engineering Projects Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. FULL-BLEED BACKGROUND LAYERS (Shared Element Target) */}
      <div className="hero-gx__bg-stack">
        {projects.map((proj, idx) => {
          const isActive = idx === activeIndex;
          const bgPos = PROJECT_BG_POSITION[proj.slug] || "center center";
          const imageSrc = proj.images[0]?.src || "/images/projects/khasab-lima-road-01.jpeg";

          return (
            <div
              key={proj.slug}
              className={`hero-gx__bg-layer ${isActive ? "hero-gx__bg-layer--active" : ""}`}
              style={{
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Image
                src={imageSrc}
                alt={proj.title}
                fill
                priority={idx === 0 || idx === 1}
                sizes="100vw"
                quality={90}
                style={{
                  objectFit: "cover",
                  objectPosition: bgPos,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. CINEMATIC MULTI-DIRECTIONAL VIGNETTE SCRIM */}
      <div className="hero-gx__scrim hero-gx__scrim--left" aria-hidden="true" />
      <div className="hero-gx__scrim hero-gx__scrim--bottom" aria-hidden="true" />
      <div className="hero-gx__scrim hero-gx__scrim--top" aria-hidden="true" />

      {/* 3. MAIN HERO STAGE: ASYMMETRIC CONTENT & FLOATING DECK */}
      <div className="hero-gx__stage">
        {/* LEFT COLUMN: EDITORIAL CONTENT & HEADLINE */}
        <div className="hero-gx__content">
          <div key={`eyebrow-${currentProject.slug}`} className="hero-gx__eyebrow-row">
            <span className="hero-gx__eyebrow-dash" aria-hidden="true">—</span>
            <span className="hero-gx__eyebrow-text">
              {currentProject.location.toUpperCase()} · {(currentProject.quickStat || currentProject.scope).toUpperCase()}
            </span>
          </div>

          <div className="hero-gx__title-wrapper">
            <h1 key={`title-${currentProject.slug}`} className="hero-gx__title">
              {currentProject.shortTitle || currentProject.title}
            </h1>
          </div>

          <div className="hero-gx__desc-wrapper">
            <p key={`desc-${currentProject.slug}`} className="hero-gx__description">
              {currentProject.challenge || currentProject.scope}
            </p>
          </div>

          <div key={`techs-${currentProject.slug}`} className="hero-gx__techniques">
            {(currentProject.keyTechniques || []).slice(0, 3).map((tech, techIdx) => (
              <span
                key={tech}
                className="hero-gx__tech-pill"
                style={{ animationDelay: `${0.22 + techIdx * 0.06}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="hero-gx__actions">
            <Link
              href={`/projects/${currentProject.slug}`}
              className="hero-gx__btn-circle"
              aria-label={`View details of ${currentProject.title}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              href={`/projects/${currentProject.slug}`}
              className="hero-gx__btn-pill"
            >
              <span>Inspect Project Record</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>

            <Link href="/contact" className="hero-gx__btn-ghost">
              Request Consultation
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: FLOATING CAROUSEL DECK + CONTROLS (Pinterest Reference Layout) */}
        <div className="hero-gx__deck-container">
          <div className="hero-gx__deck-track">
            {previewCards.map(({ project: cardProj, index: cardIdx }, slotIdx) => {
              const cardImage = cardProj.images[0]?.src || "/images/projects/khasab-lima-road-01.jpeg";
              const cardBgPos = PROJECT_BG_POSITION[cardProj.slug] || "center center";

              return (
                <div
                  key={`${cardProj.slug}-${activeIndex}`}
                  className={`hero-gx__card ${slotIdx === 0 ? "hero-gx__card--next" : ""}`}
                  onClick={() => goToSlide(cardIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Switch to ${cardProj.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goToSlide(cardIdx);
                    }
                  }}
                  style={{
                    animationDelay: `${slotIdx * 0.05}s`,
                  }}
                >
                  <div className="hero-gx__card-image-wrap">
                    <Image
                      src={cardImage}
                      alt={cardProj.title}
                      fill
                      sizes="(max-width: 768px) 160px, 240px"
                      quality={85}
                      style={{
                        objectFit: "cover",
                        objectPosition: cardBgPos,
                      }}
                    />
                    <div className="hero-gx__card-overlay" />
                  </div>

                  <div className="hero-gx__card-content">
                    <span className="hero-gx__card-badge">
                      {cardProj.governorate || "Oman"}
                    </span>
                    <h2 className="hero-gx__card-title">
                      {cardProj.shortTitle || cardProj.title}
                    </h2>
                    <span className="hero-gx__card-tag">
                      {cardProj.quickStat || cardProj.scope}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INTEGRATED SLIDER CONTROLS DIRECTLY UNDER CARDS (Zero Empty Space) */}
          <div className="hero-gx__deck-controls">
            <div className="hero-gx__nav-buttons">
              <button
                type="button"
                className="hero-gx__nav-btn"
                onClick={prevSlide}
                aria-label="Previous project slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="hero-gx__nav-btn"
                onClick={nextSlide}
                aria-label="Next project slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* LIQUID PROGRESS INDICATOR */}
            <div className="hero-gx__progress-rail" aria-hidden="true">
              <div
                className="hero-gx__progress-bar"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {/* EDITORIAL NUMERAL SLIDE COUNTER */}
            <div className="hero-gx__counter">
              <span className="hero-gx__counter-active">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="hero-gx__counter-divider">/</span>
              <span className="hero-gx__counter-total">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <span className="hero-gx__status-tag">
              CR {company.crNumber}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

