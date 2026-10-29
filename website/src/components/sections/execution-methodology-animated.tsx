"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";

type Step = {
  num: string;
  title: string;
  desc: string;
};

type ExecutionMethodologyAnimatedProps = {
  steps: Step[];
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

export function ExecutionMethodologyAnimated({ steps }: ExecutionMethodologyAnimatedProps) {
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

    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;
    let animFrameId: number;

    const updateTransforms = () => {
      // Lerp interpolation (0.09) for silky physical momentum
      currentProgress += (targetProgress - currentProgress) * 0.09;

      const gridWidth = grid.offsetWidth;
      const naturalGridCenterX = gridWidth / 2;

      cards.forEach((card, i) => {
        // Use offsetLeft & offsetWidth which are invariant to CSS transforms
        const naturalCardLeft = card.offsetLeft;
        const naturalCardWidth = card.offsetWidth;
        const naturalCardCenterX = naturalCardLeft + naturalCardWidth / 2;

        // Distance required to move this card to the horizontal center of the grid
        const distanceToCenter = naturalGridCenterX - naturalCardCenterX;

        // Fan stagger slice when stacked (leaves a 44px layered tab per card)
        const staggerOffset = (i - (cards.length - 1) / 2) * 44;

        // Progress factor: 0 = stacked, 1 = fully separated in normal columns
        const unstackFactor = Math.max(0, Math.min(1, currentProgress));
        const stackRemaining = 1 - unstackFactor;

        // Interpolate horizontal travel
        const xOffset = (distanceToCenter + staggerOffset) * stackRemaining;

        // Subtle rotational fan when stacked (e.g. -3.6deg, -1.2deg, +1.2deg, +3.6deg)
        const rot = (i - (cards.length - 1) / 2) * 2.4 * stackRemaining;

        // Subtle scale: 0.965 when stacked -> 1.000 when normal
        const scale = 0.965 + 0.035 * unstackFactor;

        // Multi-layer physical elevation shadow when stacked
        const shadowSpread = Math.round(18 + stackRemaining * 12);
        const shadowBlur = Math.round(36 + stackRemaining * 20);
        const shadowAlpha = (0.10 + stackRemaining * 0.12).toFixed(3);

        card.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = `${i + 1}`;
        card.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.06)`;
      });

      if (Math.abs(targetProgress - currentProgress) > 0.0008) {
        animFrameId = window.requestAnimationFrame(updateTransforms);
      } else {
        isTicking = false;
      }
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // Bidirectional Scroll Dynamics:
      // Works symmetrically whether scrolling down from top OR scrolling up from bottom!
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = winHeight / 2;
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Dead-zone around viewport center (120px) where cards remain 100% fanned out in normal position
      const focusZone = 120;
      // Distance from center at which cards fully collapse into stacked deck
      const stackBoundary = (winHeight + rect.height) / 2 * 0.68;

      if (distFromCenter <= focusZone) {
        targetProgress = 1;
      } else {
        const t = (distFromCenter - focusZone) / (stackBoundary - focusZone);
        targetProgress = Math.max(0, Math.min(1, 1 - t));
      }

      if (!isTicking) {
        isTicking = true;
        animFrameId = window.requestAnimationFrame(updateTransforms);
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
    <section ref={sectionRef} className="content-section methodology-animated-section">
      <Container>
        <SectionHeading
          eyebrow="EXECUTION METHODOLOGY"
          title="A disciplined, step-by-step engineering delivery process."
          summary="Systematic 4-stage delivery from initial ground risk analysis to certified QA/QC sign-off."
        />

        <div ref={gridRef} className="approach-grid approach-grid--animated">
          {steps.map((step) => (
            <div key={step.num} className="approach-step approach-step--stacked">
              <span className="approach-step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
