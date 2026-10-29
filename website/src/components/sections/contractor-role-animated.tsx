"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import type { company } from "@/content/company";
import { withBasePath } from "@/lib/site-path";

type ContractorRoleAnimatedProps = {
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

export function ContractorRoleAnimated({ company }: ContractorRoleAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageCanvasRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [hasIntersected, setHasIntersected] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

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

  const isInView = prefersReducedMotion || hasIntersected;

  // 1. Locomotive-style Intersection Trigger with Fail-safe
  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    // Safety fallback: ensure all content is 100% visible within 600ms no matter what
    const fallbackTimer = window.setTimeout(() => {
      setHasIntersected(true);
    }, 600);

    // Initial check scheduled via requestAnimationFrame
    const rafId = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9) {
        setHasIntersected(true);
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // 2. Monolithic 3D Architectural Roll Rotation (Whole Section 3D Perspective Canvas) + Parallax
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || isMobile) return;

    let targetFactor = 0;
    let currentFactor = 0;
    let isTicking = false;
    let animFrameId: number;

    const maxRotX = 8.5; // Clearly visible top-to-bottom 3D vertical roll (degrees)
    const maxScale = 0.035; // Gentle architectural scale depth (0.965 to 1.000)
    const maxTransZ = 24; // Subtle spatial elevation (pixels)

    const render3D = () => {
      // Lerp interpolation (0.09) for silky physical weight and smooth damping
      currentFactor += (targetFactor - currentFactor) * 0.09;

      if (stageCanvasRef.current) {
        // Monolithic 3D Scroll Roll across the entire block:
        // As you scroll down into section, currentFactor is positive -> rotates top-to-bottom (+rotX)
        // At center of viewport, currentFactor = 0 -> exactly 0.00deg, scale 1.000, 100% flat and crystal-clear
        // As you scroll past section, currentFactor is negative -> rotates forward (-rotX)
        const rotX = currentFactor * maxRotX;
        const scale = 1 - Math.abs(currentFactor) * maxScale;
        const tz = -Math.abs(currentFactor) * maxTransZ;

        stageCanvasRef.current.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      }

      if (Math.abs(targetFactor - currentFactor) > 0.0008) {
        animFrameId = window.requestAnimationFrame(render3D);
      } else {
        isTicking = false;
      }
    };

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const winHeight = window.innerHeight;

      if (rect.bottom > -150 && rect.top < winHeight + 150) {
        // Section center relative to viewport center
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = winHeight / 2;
        const span = (winHeight + rect.height) / 2;
        // As you scroll down the page, sectionCenter decreases; inverting gives positive factor
        const p = (sectionCenter - viewportCenter) / span;
        targetFactor = Math.max(-1, Math.min(1, -p));

        if (!isTicking) {
          isTicking = true;
          animFrameId = window.requestAnimationFrame(render3D);
        }
      }

      // Smooth subtle photo parallax inside visual card
      if (mediaRef.current) {
        const mRect = mediaRef.current.getBoundingClientRect();
        if (mRect.bottom > -80 && mRect.top < winHeight + 80) {
          const centerDelta = (mRect.top + mRect.height / 2 - winHeight / 2) / winHeight;
          setParallaxY(Math.round(centerDelta * 24 * 10) / 10);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    render3D();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`content-section editorial-section ${isMounted ? "is-animated" : ""} ${isInView ? "is-inview" : ""}`}
    >
      <Container>
        <div className="editorial-3d-stage">
          <div ref={stageCanvasRef} className="two-column-editorial editorial-3d-canvas">
            {/* Left Column: Heading + Technical Capability Card */}
        <div className="editorial-col-left">
          <div data-loco data-loco-delay="1">
            <SectionHeading
              eyebrow="SPECIALIST CONTRACTOR ROLE · SULTANATE OF OMAN"
              title="Design and execution capability built around Oman’s demanding geology."
            />
          </div>

          <div data-loco data-loco-delay="2" className="editorial-card-motion-wrap">
            <div
              className="editorial-capability-card"
            >
              <div className="editorial-capability-card__header">
                <div className="editorial-capability-card__tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <span>Specialist Discipline Scope</span>
                </div>
                <div className="editorial-capability-card__registry">
                  <span className="registry-dot" aria-hidden="true" />
                  <span>CR {company.crNumber} · Muscat</span>
                </div>
              </div>

              <ul className="editorial-capability-items">
                <li className="editorial-capability-item" data-loco-child data-loco-delay="3">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">01</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Design & Build Integration</h4>
                      <span className="editorial-item-pill">Turnkey Package</span>
                    </div>
                    <p>
                      Translating geological data, borehole stratigraphy, and rock mass discontinuity surveys into constructible site packages.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Borehole Correlation</span>
                      <span>Discontinuity Mapping</span>
                      <span>Prestressed Anchor Design</span>
                    </div>
                  </div>
                </li>

                <li className="editorial-capability-item" data-loco-child data-loco-delay="4">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">02</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Specialist Plant & High-Angle Rigging</h4>
                      <span className="editorial-item-pill">Rigging Plant</span>
                    </div>
                    <p>
                      Tracked hydraulic drilling rigs, crane-suspended work platforms, and certified rope-access crews on steep mountain cuttings.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Tracked Crawler Rigs</span>
                      <span>Suspended Platforms</span>
                      <span>Certified Rope-Access</span>
                    </div>
                  </div>
                </li>

                <li className="editorial-capability-item" data-loco-child data-loco-delay="5">
                  <div className="editorial-capability-item__badge" aria-hidden="true">
                    <span className="editorial-capability-item__num">03</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="editorial-capability-item__body">
                    <div className="editorial-item-title-row">
                      <h4>Rigorous QA/QC Verification</h4>
                      <span className="editorial-item-pill">Certified Sign-Off</span>
                    </div>
                    <p>
                      Prestressed anchor pull-out proof testing, high-pressure grout pressure logging, and shotcrete core compressive analysis.
                    </p>
                    <div className="editorial-item-tags">
                      <span>Proof Testing Loads</span>
                      <span>Continuous Grout Logs</span>
                      <span>Core Analysis</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="editorial-capability-card__footer" data-loco-child data-loco-delay="6">
                <div className="editorial-footer-heading">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Active Regional Deployments in Oman:</span>
                </div>
                <div className="governorate-pills">
                  <span className="governorate-pill governorate-pill--hq">
                    <span className="pin-dot" />
                    <strong>Muscat</strong> (HQ & Central Yard)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Musandam</strong> (Sea-Cliffs)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Al Sharqiyah</strong> (Expressways)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Nizwa</strong> (Water Network)
                  </span>
                  <span className="governorate-pill">
                    <span className="pin-dot" />
                    <strong>Buraimi</strong> (Rock Cuts)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Quote + Authority Visual Deck */}
        <div className="editorial-col-right">
          <div className="editorial-lead-quote" data-loco data-loco-delay="1">
            <p className="editorial-lead-text">
              Headquartered in Muscat, Middle East Business Geotech LLC bridges the critical gap between geotechnical design and safe site execution across Oman’s rugged geological conditions.
            </p>
            <p className="editorial-sub-text">
              We partner with civil authorities, engineering consultants, and leading EPC main contractors to safely execute slope stabilisation, deep foundation, and underground packages on schedule.
            </p>
          </div>

          <div data-loco data-loco-delay="2" className="editorial-deck-motion-wrap">
            <div
              className="editorial-right-deck"
            >
              {/* Authentic Engineering Visual Card */}
              <div className="editorial-visual-card">
                <div ref={mediaRef} className="editorial-visual-card__media">
                  <Image
                    src={withBasePath("/images/projects/khasab-lima-road-01.jpeg")}
                    alt="Crane-supported slope protection and specialised drilling on steep coastal rock face in Musandam, Oman"
                    width={640}
                    height={320}
                    className="editorial-visual-card__img editorial-loco-img"
                    style={{
                      transform: !isMobile && !prefersReducedMotion ? `translate3d(0, ${parallaxY}px, 0) scale(1.08)` : undefined,
                    }}
                  />
                  <div className="editorial-visual-card__badge">
                    <span className="status-indicator-live" />
                    <span>Verified Site Execution · Musandam</span>
                  </div>
                </div>
                <div className="editorial-visual-card__content">
                  <p className="editorial-visual-card__caption">
                    High-angle crane-suspended work platforms & rope-access drilling securing vertical limestone formations.
                  </p>
                  <span className="editorial-visual-card__authority">
                    Aligned with MTCIT & Nama Water Engineering Specifications
                  </span>
                </div>
              </div>

              {/* High-Impact Authority Metrics */}
              <div className="editorial-stats-grid">
                <div className="stat-card">
                  <div className="stat-card__icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="stat-card__info">
                    <span className="stat-card__label">Headquarters & Fleet Base</span>
                    <strong className="stat-card__value">Muscat, Sultanate of Oman</strong>
                    <span className="stat-card__hint">South Al Khuwair Base · Nationwide Mobilization</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div className="stat-card__info">
                    <span className="stat-card__label">Operational Focus</span>
                    <strong className="stat-card__value">Road, Water & Civil Infrastructure</strong>
                    <span className="stat-card__hint">Slopes · Grouting · Deep Piling · Underground</span>
                  </div>
                </div>
              </div>

              {/* Action Group */}
              <div className="editorial-actions">
                <ButtonLink href="/about" variant="primary">
                  About our engineering background
                </ButtonLink>
                <ButtonLink href="/projects" variant="steel">
                  Inspect project records
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
