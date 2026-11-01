"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DynamicHeadline } from "@/components/ui/dynamic-headline";
import type { company } from "@/content/company";
import { withBasePath } from "@/lib/site-path";
import type { Project } from "@/types/content";

const SLIDE_DURATION_MS = 4800;

const PROJECT_COORDS: Record<string, string> = {
  "al-ubaidah-fayyad-road": "24.2500° N, 55.7600° E",
  "wilayat-manah": "22.7800° N, 57.5900° E",
  "al-kamil-sur-road": "22.5608° N, 59.5208° E",
  "khasab-lima-road": "26.1800° N, 56.2500° E",
  "al-sharqiyah-region": "22.6500° N, 58.5000° E",
};

const PROJECT_BG_POSITION: Record<string, string> = {
  "al-ubaidah-fayyad-road": "center 68%",
  "khasab-lima-road": "40% 55%",
  "wilayat-manah": "center 62%",
  "al-kamil-sur-road": "center 50%",
  "al-sharqiyah-region": "center 60%",
};

const leftCards = [
  {
    num: "01",
    title: "Slope Stabilisation",
    tag: "SLOPE PROTECTION",
    desc: "Cable anchors & rock bolting.",
    href: "/services/slope-stabilisation",
    image: withBasePath("/images/projects/al-ubaidah-fayyad-road-01.jpeg"),
  },
  {
    num: "02",
    title: "Ground Improvement",
    tag: "GROUTING & TAM",
    desc: "Jet, TAM & fissure grouting.",
    href: "/services/ground-improvement-and-grouting",
    image: withBasePath("/images/projects/wilayat-manah-01.jpeg"),
  },
];

const rightCards = [
  {
    num: "03",
    title: "Foundation Engineering",
    tag: "PILING & SHORING",
    desc: "Secant & contiguous piling.",
    href: "/services/piling-and-foundation-engineering",
    image: withBasePath("/images/projects/al-kamil-sur-road-01.png"),
  },
  {
    num: "04",
    title: "Underground Works",
    tag: "TUNNELLING & SHAFTS",
    desc: "NATM tunnelling & deep shafts.",
    href: "/services/tunnelling-and-underground-works",
    image: withBasePath("/images/projects/khasab-lima-road-01.jpeg"),
  },
];

type HeroFullBleedProps = {
  projects: readonly Project[];
  company: typeof company;
};

const emptySubscribe = () => () => {};

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

const subscribeIsMobile = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 48rem)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getIsMobileSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 48rem)").matches;
};

export function HeroFullBleed({ projects, company }: HeroFullBleedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const isMobile = useSyncExternalStore(
    subscribeIsMobile,
    getIsMobileSnapshot,
    () => false
  );

  const heroRef = useRef<HTMLElement>(null);
  const tickingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

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

  const handleScrollDown = () => {
    if (typeof window === "undefined") return;
    const nextSection = document.querySelector(".content-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 650, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || total <= 1) return;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, total, currentIndex, prefersReducedMotion]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentProject = projects[currentIndex] ?? projects[0];
  const currentCoords =
    PROJECT_COORDS[currentProject.slug] ?? "23.5880° N, 58.3829° E";

  // 3D Scroll Depth Progress (0 to 1 over first 520px of scroll)
  const scrollProgress = Math.min(Math.max(scrollY / 520, 0), 1);
  const enable3D = isClient && !prefersReducedMotion;

  // 3D Unified Zoom-Out System for All Hero Components
  // 1. Background Dolly Zoom: fixed on mouse move, gently zooms and pans with scroll float
  const bgStackStyle = enable3D
    ? isMobile
      ? {
          transform: `translate3d(0, ${-scrollY * 0.12}px, 0) scale(${1.02 + scrollProgress * 0.05})`,
          transformOrigin: "center 40%",
          willChange: "transform",
        }
      : {
          transform: `translate3d(0, ${-scrollProgress * 20}px, 0) scale(${
            1.03 + scrollProgress * 0.08
          })`,
          transformOrigin: "center 45%",
          willChange: "transform",
        }
    : undefined;

  // 2. Headline & CTAs 3D Zoom Out: fixed on mouse, recedes with scroll float
  const content3DStyle = enable3D
    ? isMobile
      ? {
          transform: `perspective(800px) translate3d(0, ${-scrollY * 0.08}px, 0) scale(${
            1 - scrollProgress * 0.04
          })`,
          transformOrigin: "center top",
          willChange: "transform",
        }
      : {
          transform: `perspective(1200px) translate3d(0, ${
            -scrollY * 0.26
          }px, ${-scrollProgress * 140}px) scale(${
            1 - scrollProgress * 0.16
          }) rotateX(${scrollProgress * 4.5}deg)`,
          opacity: Math.max(1 - Math.pow(scrollProgress, 2.2), 0),
          transformOrigin: "center top",
          willChange: "transform, opacity",
        }
    : undefined;

  // 3. Telemetry HUD 3D Zoom Out: fixed on mouse, recedes with scroll float
  const telemetry3DStyle = enable3D
    ? isMobile
      ? {
          transform: `perspective(800px) translate3d(0, ${-scrollY * 0.06}px, 0)`,
          transformOrigin: "center center",
          willChange: "transform",
        }
      : {
          transform: `perspective(1200px) translate3d(0, ${
            -scrollY * 0.22
          }px, ${-scrollProgress * 120}px) scale(${
            1 - scrollProgress * 0.14
          }) rotateX(${scrollProgress * 3.5}deg) rotateY(${
            -scrollProgress * 4
          }deg)`,
          opacity: Math.max(1 - Math.pow(scrollProgress, 2.2), 0),
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }
    : undefined;

  // 4. Entire Dock Deck 3D Zoom Out (Desktop only to prevent premature mobile fading)
  const dock3DStyle = enable3D && !isMobile
    ? {
        transform: `perspective(1200px) translate3d(0, ${-scrollY * 0.12}px, ${
          -scrollProgress * 80
        }px) scale(${1 - scrollProgress * 0.08})`,
        opacity: Math.max(1 - Math.pow(scrollProgress, 2.4), 0),
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }
    : undefined;

  // 5. Left Capability Cards 3D Peel & Zoom Out (Desktop only)
  const leftCards3DStyle = enable3D && !isMobile
    ? {
        transform: `perspective(1000px) translate3d(${
          -scrollProgress * 14
        }px, 0, ${-scrollProgress * 40}px) rotateY(${scrollProgress * 3.5}deg)`,
        transformOrigin: "right center",
        willChange: "transform",
      }
    : undefined;

  // 6. Right Capability Cards 3D Peel & Zoom Out (Desktop only)
  const rightCards3DStyle = enable3D && !isMobile
    ? {
        transform: `perspective(1000px) translate3d(${
          scrollProgress * 14
        }px, 0, ${-scrollProgress * 40}px) rotateY(${-scrollProgress * 3.5}deg)`,
        transformOrigin: "left center",
        willChange: "transform",
      }
    : undefined;

  // 7. Center Arch Dome 3D Zoom Out (Desktop only)
  const centerArch3DStyle = enable3D && !isMobile
    ? {
        transform: `perspective(1000px) translate3d(0, ${
          -scrollProgress * 8
        }px, ${-scrollProgress * 30}px) scale(${1 - scrollProgress * 0.05})`,
        transformOrigin: "center bottom",
        willChange: "transform",
      }
    : undefined;

  return (
    <section
      ref={heroRef}
      className="hero-cinematic"
      aria-labelledby="hero-title"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Full-Bleed Background Imagery with 3D Depth Parallax */}
      <div
        className="hero-cinematic__bg-stack"
        aria-hidden="true"
        style={bgStackStyle}
      >
        {projects.map((project, index) => {
          const isActive = index === currentIndex;
          const primaryImage =
            project.slug === "al-sharqiyah-region" && project.images[1]
              ? project.images[1]
              : project.images[0];

          return (
            <div
              key={project.slug}
              className={`hero-cinematic__bg-slide ${
                isActive ? "hero-cinematic__bg-slide--active" : ""
              }`}
            >
              <Image
                src={primaryImage.src}
                alt=""
                fill
                priority={index === 0}
                className="hero-cinematic__bg-image"
                style={{
                  objectPosition: PROJECT_BG_POSITION[project.slug] ?? "center 50%",
                }}
                sizes="100vw"
              />
            </div>
          );
        })}

        <div className="hero-cinematic__overlay-vignette" />
        <div className="hero-cinematic__light-leak" />
        <div className="hero-cinematic__overlay-gradient" />
        <div className="hero-cinematic__overlay-bottom" />
      </div>

      {/* 2. Top Hero Stage: Dynamic Headline, Actions, Sleek Telemetry */}
      <Container className="hero-cinematic__stage">
        <div className="hero-cinematic__grid">
          {/* Left Column: Eyebrow, Headline, Lead, Action Buttons, Trust Line */}
          <div className="hero-cinematic__content" style={content3DStyle}>
            <div className="hero-cinematic__eyebrow">
              <span className="hero-cinematic__eyebrow-beacon" aria-hidden="true" />
              <span className="hero-cinematic__eyebrow-text">
                SPECIALIST GEOTECHNICAL CONTRACTOR · MUSCAT, OMAN
              </span>
            </div>

            <DynamicHeadline />

            <p className="hero-cinematic__summary">
              Specialist geotechnical contractor delivering slope protection, ground engineering and deep foundations across the Sultanate of Oman.
            </p>

            <div className="hero-cinematic__actions" aria-label="Primary actions">
              <ButtonLink href="/contact" variant="primary" className="hero-cinematic__btn-primary">
                <span>Request a consultation</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                </svg>
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary" className="hero-cinematic__btn-secondary">
                <span>Explore project records</span>
              </ButtonLink>
            </div>

            <div className="hero-cinematic__trust-cue">
              <span className="hero-cinematic__trust-badge">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <span>MoCI Grade 1 Certified · Direct tender desk response within 24h</span>
            </div>
          </div>

          {/* Right Column: Sleek Floating HUD (Compact & Minimal like AgriNova) */}
          <div className="hero-cinematic__telemetry-col" style={telemetry3DStyle}>
            {/* Live Field Project Spotlight Card */}
            <div className="hero-cinematic__spotlight-card">
              <div className="hero-cinematic__spotlight-header">
                <div className="flex items-center gap-1.5">
                  <span className="hero-cinematic__live-beacon" aria-hidden="true" />
                  <span className="hero-cinematic__live-label">LIVE FIELD SITE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hero-cinematic__site-coords font-mono">{currentCoords}</span>
                  <span className="hero-cinematic__site-counter">
                    0{currentIndex + 1} / 0{total}
                  </span>
                </div>
              </div>

              <Link
                href={`/projects/${currentProject.slug}`}
                className="hero-cinematic__site-title group"
              >
                <span>{currentProject.shortTitle}</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                </svg>
              </Link>
              <p className="hero-cinematic__site-loc">
                {currentProject.location}
                {currentProject.governorate ? ` · ${currentProject.governorate} Gov.` : ""}
              </p>

              {/* Story Reel Progress Segments */}
              <div
                className="hero-cinematic__reel-progress"
                role="tablist"
                aria-label="Project slide navigation"
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
                      className={`hero-cinematic__reel-segment ${
                        isSelected ? "hero-cinematic__reel-segment--active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                    >
                      <span className="hero-cinematic__reel-track">
                        <span
                          key={isSelected ? `active-${currentIndex}` : `idle-${index}`}
                          className={`hero-cinematic__reel-fill ${
                            isPast ? "hero-cinematic__reel-fill--completed" : ""
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floating Sleek Badges (like AgriNova's Floating Pills) */}
            <div className="hero-cinematic__floating-pills">
              <div className="hero-cinematic__floating-pill">
                <span className="hero-cinematic__pill-glow-dot" />
                <span className="hero-cinematic__pill-title">TURNKEY DESIGN & BUILD</span>
              </div>
              <div className="hero-cinematic__floating-pill">
                <span className="hero-cinematic__pill-glow-dot" />
                <span className="hero-cinematic__pill-title">SPECIALIST FLEET DEPOT</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. Docked Symmetrical Capability Deck (AgriNova Arch Layout) */}
      <div className="hero-dock" style={dock3DStyle}>
        <Container className="hero-dock__container">
          <div className="hero-dock__symmetrical-deck">
            {/* Left 2 Cards */}
            <div className="hero-dock__flank-cards" style={leftCards3DStyle}>
              {leftCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="hero-dock__card group"
                >
                  <div className="hero-dock__card-thumb">
                    <Image
                      src={withBasePath(card.image)}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 64rem) 100vw, 20vw"
                    />
                    <div className="hero-dock__card-thumb-overlay" />
                    <span className="hero-dock__card-tag">{card.tag}</span>
                  </div>

                  <div className="hero-dock__card-body">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="hero-dock__card-title">{card.title}</h3>
                      <span className="hero-dock__card-arrow" aria-hidden="true">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                    <p className="hero-dock__card-desc hidden md:block">{card.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Center Dome Arch (The AgriNova Signature Centerpiece) */}
            <div className="hero-dock__center-dome" style={centerArch3DStyle}>
              <div className="hero-dock__arch-badge">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span>CORE DISCIPLINES</span>
              </div>

              <h2 className="hero-dock__arch-title">
                Geotechnical Solutions{" "}
                <span className="hero-dock__arch-highlight">for Oman’s Terrain.</span>
              </h2>

              <p className="hero-dock__arch-lead">
                Specialist ground works across rugged wadis, coastal expressways & mountain passes.
              </p>

              {/* Central Downside Scroll Indicator (Desktop Only) */}
              <button
                type="button"
                onClick={handleScrollDown}
                className="hero-dock__scroll-btn group hidden md:inline-flex"
                aria-label="Scroll to company overview"
                title="Scroll down to company overview"
              >
                <span className="hero-dock__emblem-pulse" />
                <div className="hero-dock__emblem-disc">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hero-dock__down-arrow"
                    aria-hidden="true"
                  >
                    <path d="M12 4v14M19 13l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Right 2 Cards */}
            <div className="hero-dock__flank-cards" style={rightCards3DStyle}>
              {rightCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="hero-dock__card group"
                >
                  <div className="hero-dock__card-thumb">
                    <Image
                      src={withBasePath(card.image)}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 64rem) 100vw, 20vw"
                    />
                    <div className="hero-dock__card-thumb-overlay" />
                    <span className="hero-dock__card-tag">{card.tag}</span>
                  </div>

                  <div className="hero-dock__card-body">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="hero-dock__card-title">{card.title}</h3>
                      <span className="hero-dock__card-arrow" aria-hidden="true">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                    <p className="hero-dock__card-desc hidden md:block">{card.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>

        {/* Corporate Qualifications Telemetry Bar (Full-Width High-Contrast Bar) */}
        <div className="hero-dock__footer-bar">
          <Container className="hero-dock__footer-inner">
            <div className="hero-dock__meta">
              <div className="hero-dock__meta-item">
                <span className="hero-dock__meta-icon">✦</span>
                <span className="hero-dock__meta-label">COMMERCIAL REG:</span>
                <span className="hero-dock__meta-val">CR {company.crNumber} · MoCI Grade 1</span>
              </div>
              <div className="hero-dock__meta-sep" aria-hidden="true" />
              <div className="hero-dock__meta-item">
                <span className="hero-dock__meta-icon">✦</span>
                <span className="hero-dock__meta-label">CENTRAL FLEET DEPOT:</span>
                <span className="hero-dock__meta-val">Muscat, Sultanate of Oman</span>
              </div>
              <div className="hero-dock__meta-sep" aria-hidden="true" />
              <div className="hero-dock__meta-item">
                <span className="hero-dock__meta-icon">✦</span>
                <span className="hero-dock__meta-label">SPECIALIST CONTRACTING:</span>
                <span className="hero-dock__meta-val">Turnkey Civil Works Licensed</span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
