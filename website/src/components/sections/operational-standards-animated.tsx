"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";

export type StandardItem = {
  num: string;
  title: string;
  desc: string;
  badgeSuffix?: string;
};

type OperationalStandardsAnimatedProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  lead: string;
  standards: readonly StandardItem[] | StandardItem[];
  note?: string;
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

export function OperationalStandardsAnimated({
  eyebrow = "OPERATIONAL STANDARDS",
  heading,
  lead,
  standards,
  note = "All methods are planned and executed to relevant Oman ministry specifications and international geotechnical engineering standards.",
}: OperationalStandardsAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

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
      // Physical momentum damping (0.10)
      currentProgress += (targetProgress - currentProgress) * 0.10;

      const gridWidth = grid.offsetWidth;
      const naturalGridCenterX = gridWidth / 2;
      const cardCount = cards.length;

      const unstackFactor = Math.max(0, Math.min(1, currentProgress));
      const stackRemaining = 1 - unstackFactor;

      cards.forEach((card, i) => {
        // When settled in reading zone, clear inline transforms for 100% natural grid flow
        if (stackRemaining < 0.01) {
          card.style.transform = "";
          card.style.zIndex = "";
          card.style.boxShadow = "";
          return;
        }

        const naturalCardLeft = card.offsetLeft;
        const naturalCardWidth = card.offsetWidth;
        const naturalCardCenterX = naturalCardLeft + naturalCardWidth / 2;

        const distanceToCenter = naturalGridCenterX - naturalCardCenterX;
        const centerIndexOffset = i - (cardCount - 1) / 2;

        // Dynamic stagger tab so cards are layered with numbers cleanly visible
        const effectiveStagger = cardCount >= 5 ? 38 : 44;
        const staggerOffset = centerIndexOffset * effectiveStagger;

        const xOffset = (distanceToCenter + staggerOffset) * stackRemaining;
        const rot = centerIndexOffset * 1.8 * stackRemaining;
        const scale = 0.965 + 0.035 * unstackFactor;

        const shadowSpread = Math.round(18 + stackRemaining * 12);
        const shadowBlur = Math.round(36 + stackRemaining * 20);
        const shadowAlpha = (0.22 + stackRemaining * 0.32).toFixed(3);

        card.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = `${i + 1}`;
        card.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -10px rgba(0, 0, 0, ${shadowAlpha}), 0 4px 14px rgba(0, 0, 0, 0.35)`;
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
      // Fanning OUT into neat columns when entering reading zone, gathering IN when scrolling away
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = winHeight / 2;
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Generous reading zone (240px) where cards remain 100% settled in their normal 5 columns
      const focusZone = 240;
      // Distance from center at which cards fully collapse into stacked deck
      const stackBoundary = ((winHeight + rect.height) / 2) * 0.85;

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
    <section ref={sectionRef} className="values-band">
      <Container>
        {eyebrow && (
          <p className="eyebrow" style={{ color: "var(--steel-light)" }}>
            {eyebrow}
          </p>
        )}
        {typeof heading === "string" ? <h2>{heading}</h2> : heading}
        <p className="values-band__lead">{lead}</p>

        <ul ref={gridRef} className="values-band__grid">
          {standards.map((val) => (
            <li key={val.num} className="values-band__item">
              <span className="values-band__item-num">
                {val.num} {val.badgeSuffix || ""}
              </span>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </li>
          ))}
        </ul>

        {note && <div className="values-band__note">{note}</div>}
      </Container>
    </section>
  );
}
