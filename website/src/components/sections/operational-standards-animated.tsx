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

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];
    if (cards.length === 0) return;

    const cardCount = cards.length;
    let animFrameId: number;
    let isTicking = false;
    let lastWidth = window.innerWidth;

    // Desktop mode tracking: single progress for horizontal fan deck
    let desktopTargetProgress = 0;
    let desktopCurrentProgress = 0;

    // Mobile / Tablet mode tracking: individual per-card progress for vertical kinetic stack
    const mobileTargetProgresses = new Float32Array(cardCount).fill(0);
    const mobileCurrentProgresses = new Float32Array(cardCount).fill(0);

    const resetCardTransforms = () => {
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
        card.style.opacity = "";
      });
    };

    const updateTransforms = () => {
      const isDesktop = window.innerWidth >= 1024; // 64rem desktop breakpoint

      if (isDesktop) {
        // --- DESKTOP ANIMATION: Horizontal Card-Spread & Fan Deck ---
        desktopCurrentProgress += (desktopTargetProgress - desktopCurrentProgress) * 0.10;
        const unstackFactor = Math.max(0, Math.min(1, desktopCurrentProgress));
        const stackRemaining = 1 - unstackFactor;

        const gridWidth = grid.offsetWidth;
        const naturalGridCenterX = gridWidth / 2;

        cards.forEach((card, i) => {
          if (stackRemaining < 0.01) {
            card.style.transform = "";
            card.style.zIndex = "";
            card.style.boxShadow = "";
            card.style.opacity = "";
            return;
          }

          const naturalCardLeft = card.offsetLeft;
          const naturalCardWidth = card.offsetWidth;
          const naturalCardCenterX = naturalCardLeft + naturalCardWidth / 2;

          const distanceToCenter = naturalGridCenterX - naturalCardCenterX;
          const centerIndexOffset = i - (cardCount - 1) / 2;

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
          card.style.opacity = "";
        });

        if (Math.abs(desktopTargetProgress - desktopCurrentProgress) > 0.0008) {
          animFrameId = window.requestAnimationFrame(updateTransforms);
        } else {
          isTicking = false;
        }
      } else {
        // --- MOBILE / TABLET ANIMATION: Per-Card Kinetic Cascade (In & Out) ---
        let hasRemainingMotion = false;

        cards.forEach((card, i) => {
          // Lerp damping (0.12) for snappy, smooth physical response on touch scrolling
          mobileCurrentProgresses[i] += (mobileTargetProgresses[i] - mobileCurrentProgresses[i]) * 0.12;
          const progress = Math.max(0, Math.min(1, mobileCurrentProgresses[i]));
          const offsetFactor = 1 - progress;

          if (Math.abs(mobileTargetProgresses[i] - mobileCurrentProgresses[i]) > 0.001) {
            hasRemainingMotion = true;
          }

          // In central reading zone: 100% flat and pristine
          if (offsetFactor < 0.015) {
            card.style.transform = "";
            card.style.zIndex = "";
            card.style.boxShadow = "";
            card.style.opacity = "";
            return;
          }

          const cardRect = card.getBoundingClientRect();
          const winHeight = window.innerHeight;
          const distFromCenter = cardRect.top + cardRect.height / 2 - winHeight / 2;
          const isEnteringFromBottom = distFromCenter > 0;

          // Smooth vertical elevation & playful subtle alternation
          const translateY = isEnteringFromBottom
            ? offsetFactor * 26
            : -offsetFactor * 18;
          const rot = (i % 2 === 0 ? -1.5 : 1.5) * (isEnteringFromBottom ? 1 : -0.7) * offsetFactor;
          const scale = 0.945 + 0.055 * progress;
          const opacity = 0.70 + 0.30 * progress;

          const shadowSpread = Math.round(12 + offsetFactor * 10);
          const shadowBlur = Math.round(24 + offsetFactor * 16);
          const shadowAlpha = (0.35 + offsetFactor * 0.25).toFixed(3);

          card.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.zIndex = `${i + 1}`;
          card.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -8px rgba(0, 0, 0, ${shadowAlpha}), 0 4px 12px rgba(0, 0, 0, 0.3)`;
          card.style.opacity = opacity.toFixed(3);
        });

        if (hasRemainingMotion) {
          animFrameId = window.requestAnimationFrame(updateTransforms);
        } else {
          isTicking = false;
        }
      }
    };

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      const rect = section.getBoundingClientRect();
      const winHeight = window.innerHeight;

      if (isDesktop) {
        // Desktop: calculate section-wide distance to viewport center
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = winHeight / 2;
        const distFromCenter = Math.abs(sectionCenter - viewportCenter);

        const focusZone = 240;
        const stackBoundary = ((winHeight + rect.height) / 2) * 0.85;

        if (distFromCenter <= focusZone) {
          desktopTargetProgress = 1;
        } else {
          const t = (distFromCenter - focusZone) / (stackBoundary - focusZone);
          desktopTargetProgress = Math.max(0, Math.min(1, 1 - t));
        }
      } else {
        // Mobile / Tablet: calculate per-card proximity to the viewport center reading zone
        const viewportCenter = winHeight / 2;
        const focusZone = Math.max(80, winHeight * 0.16);
        const activeRange = winHeight * 0.44;

        cards.forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);

          if (dist <= focusZone) {
            mobileTargetProgresses[i] = 1;
          } else {
            const t = (dist - focusZone) / (activeRange - focusZone);
            mobileTargetProgresses[i] = Math.max(0, Math.min(1, 1 - t));
          }
        });
      }

      if (!isTicking) {
        isTicking = true;
        animFrameId = window.requestAnimationFrame(updateTransforms);
      }
    };

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      const wasDesktop = lastWidth >= 1024;
      lastWidth = window.innerWidth;

      if (isDesktop !== wasDesktop) {
        resetCardTransforms();
      }

      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animFrameId);
      resetCardTransforms();
    };
  }, [prefersReducedMotion]);

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

        <ul ref={gridRef} className="values-band__grid" role="list">
          {standards.map((standard) => (
            <li key={standard.num} className="values-band__item">
              <span className="values-band__item-num">
                {standard.num} {standard.badgeSuffix || "· COMMITMENT"}
              </span>
              <h3>{standard.title}</h3>
              <p>{standard.desc}</p>
            </li>
          ))}
        </ul>

        {note && <p className="values-band__note">{note}</p>}
      </Container>
    </section>
  );
}
