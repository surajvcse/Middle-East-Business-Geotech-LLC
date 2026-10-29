"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types/content";

type FeaturedProjectsAnimatedProps = {
  projects: Project[];
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

const subscribeIsDesktop = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(min-width: 64rem)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getIsDesktopSnapshot = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 64rem)").matches;
};

export function FeaturedProjectsAnimated({ projects }: FeaturedProjectsAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const isDesktop = useSyncExternalStore(
    subscribeIsDesktop,
    getIsDesktopSnapshot,
    () => true
  );

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !isDesktop) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];
    if (cards.length === 0) return;

    let targetFactor = 0;
    let currentFactor = 0;
    let isTicking = false;
    let animFrameId: number;

    // Dual-Card Opposing 3D Vertical Roll & Kinetic Parallax (Matching Section 3 Contractor Role)
    // Left card: rolls top-to-bottom (+rotX) & glides upward (-transY)
    // Middle card: strictly FIXED in place ("middle wala fix rhega")
    // Right card: rolls in OPPOSITE direction (-rotX) & glides downward (+transY)
    const maxRotX = 10.5; // Prominent, architectural 3D vertical roll (degrees, exact match to Section 3)
    const maxParallaxY = 24; // Dynamic opposing vertical travel (pixels)
    const maxTransZ = 18; // 3D elevation towards viewer (pixels)

    const updateTransforms = () => {
      // Lerp interpolation (0.10) for responsive physical weight and momentum (exact match to Section 3)
      currentFactor += (targetFactor - currentFactor) * 0.10;

      cards.forEach((card, i) => {
        if (i === 0) {
          // Card 1 (Leftmost Project): Rolls top-to-bottom (+rotX) & glides upward (-transY)
          const rot = currentFactor * maxRotX;
          const transY = currentFactor * -maxParallaxY;
          const tz = Math.max(0, (1 - Math.abs(currentFactor)) * maxTransZ);
          const shadowAlpha = (0.10 + (1 - Math.abs(currentFactor)) * 0.05).toFixed(3);

          card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) translateZ(${tz.toFixed(1)}px)`;
          card.style.zIndex = "1";
          card.style.boxShadow = `0 18px 38px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.06)`;
        } else if (i === 1) {
          // Card 2 (Middle Project): Strictly FIXED in place ("middle wala fix rhega")
          card.style.transform = `perspective(1400px) rotateX(0deg) translateY(0px) translateZ(0px)`;
          card.style.zIndex = "2";
          card.style.boxShadow = `0 22px 42px -10px rgba(10, 34, 57, 0.14), 0 6px 18px rgba(10, 34, 57, 0.06)`;
        } else if (i === 2) {
          // Card 3 (Rightmost Project): Rolls in OPPOSITE direction (-rotX) & glides downward (+transY)
          const rot = -currentFactor * maxRotX;
          const transY = currentFactor * maxParallaxY;
          const tz = Math.max(0, (1 - Math.abs(currentFactor)) * maxTransZ);
          const shadowAlpha = (0.10 + (1 - Math.abs(currentFactor)) * 0.05).toFixed(3);

          card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) translateZ(${tz.toFixed(1)}px)`;
          card.style.zIndex = "1";
          card.style.boxShadow = `0 18px 38px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.06)`;
        }
      });

      if (Math.abs(targetFactor - currentFactor) > 0.0008) {
        animFrameId = window.requestAnimationFrame(updateTransforms);
      } else {
        isTicking = false;
      }
    };

    const handleScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const winHeight = window.innerHeight;

      if (rect.bottom > -150 && rect.top < winHeight + 150) {
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = winHeight / 2;
        const span = (winHeight + rect.height) / 2;
        const dist = sectionCenter - viewportCenter;

        // Reading lock-in zone (50px) where cards settle to 0.00deg flat
        const deadZone = 50;
        let factor = 0;
        if (Math.abs(dist) > deadZone) {
          const effectiveDist = dist > 0 ? dist - deadZone : dist + deadZone;
          const effectiveSpan = span - deadZone;
          factor = Math.max(-1, Math.min(1, -effectiveDist / effectiveSpan));
        }

        targetFactor = factor;

        if (!isTicking) {
          isTicking = true;
          animFrameId = window.requestAnimationFrame(updateTransforms);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion, isDesktop]);

  return (
    <section ref={sectionRef} className="content-section content-section--canvas featured-projects-animated-section" style={{ borderTop: "1px solid var(--border)" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <SectionHeading
            eyebrow="PROJECT EVIDENCE"
            title="Verified infrastructure experience across the Sultanate."
            summary="Photographic evidence from active and completed geotechnical packages in Oman."
          />
          <ButtonLink href="/projects" variant="steel">
            View all project records
          </ButtonLink>
        </div>

        <div ref={gridRef} className="project-grid project-grid--animated">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <p className="source-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>
              Documented from company engineering records, site logs and contract submittals.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
