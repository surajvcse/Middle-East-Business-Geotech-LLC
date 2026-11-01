"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

type ScrollStackedCardGridProps = {
  children: React.ReactNode;
  className?: string;
  staggerOffset?: number;
  maxRotation?: number;
  stackBoundaryFactor?: number;
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

export function ScrollStackedCardGrid({
  children,
  className = "",
  staggerOffset,
  maxRotation,
  stackBoundaryFactor = 0.72,
}: ScrollStackedCardGridProps) {
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
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Reset styles on small devices or when user prefers reduced motion
    if (prefersReducedMotion || !isDesktop) {
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
      });
      return;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;
    let animFrameId: number;

    const updateTransforms = () => {
      // Physical lerp damping (0.09) for silky smooth 60fps momentum
      currentProgress += (targetProgress - currentProgress) * 0.09;

      const gridWidth = grid.offsetWidth;
      const naturalGridCenterX = gridWidth / 2;

      cards.forEach((card, i) => {
        const naturalCardLeft = card.offsetLeft;
        const naturalCardWidth = card.offsetWidth;
        const naturalCardCenterX = naturalCardLeft + naturalCardWidth / 2;

        const distanceToCenter = naturalGridCenterX - naturalCardCenterX;
        const centerIndexOffset = i - (cards.length - 1) / 2;
        const effectiveStagger = staggerOffset ?? (cards.length <= 3 ? 52 : 44);
        const effectiveRotation = maxRotation ?? (cards.length <= 3 ? 2.8 : 2.4);
        const stagger = centerIndexOffset * effectiveStagger;

        const unstackFactor = Math.max(0, Math.min(1, currentProgress));
        const stackRemaining = 1 - unstackFactor;

        // When fully settled in normal spread, clear inline transforms for pristine layout
        if (stackRemaining < 0.002) {
          card.style.transform = "translate3d(0, 0, 0)";
          card.style.zIndex = "";
          card.style.boxShadow = "";
          return;
        }

        const xOffset = (distanceToCenter + stagger) * stackRemaining;
        const rot = centerIndexOffset * effectiveRotation * stackRemaining;
        const scale = 0.965 + 0.035 * unstackFactor;

        const shadowSpread = Math.round(16 + stackRemaining * 12);
        const shadowBlur = Math.round(32 + stackRemaining * 20);
        const shadowAlpha = (0.08 + stackRemaining * 0.12).toFixed(3);

        card.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = `${i + 1}`;
        card.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.05)`;
      });

      if (Math.abs(targetProgress - currentProgress) > 0.0008) {
        animFrameId = window.requestAnimationFrame(updateTransforms);
      } else {
        isTicking = false;
      }
    };

    const handleScroll = () => {
      const rect = grid.getBoundingClientRect();
      const winHeight = window.innerHeight;

      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = winHeight / 2;
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Dead-zone dynamically adapted to screen height
      const focusZone = Math.min(110, Math.max(60, winHeight * 0.12));
      // Distance from center at which cards fully collapse into stacked deck
      const stackBoundary = Math.max(focusZone + 100, ((winHeight + rect.height) / 2) * stackBoundaryFactor);

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
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
      });
    };
  }, [prefersReducedMotion, isDesktop, staggerOffset, maxRotation, stackBoundaryFactor]);

  return (
    <div
      ref={gridRef}
      className={`scroll-stacked-grid ${className}`}
    >
      {children}
    </div>
  );
}
