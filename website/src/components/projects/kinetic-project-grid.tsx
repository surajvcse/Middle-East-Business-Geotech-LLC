"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

type KineticProjectGridProps = {
  children: React.ReactNode;
  className?: string;
  maxRotX?: number;
  maxParallaxY?: number;
  maxTransZ?: number;
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

export function KineticProjectGrid({
  children,
  className = "",
  maxRotX = 10.5,
  maxParallaxY = 24,
  maxTransZ = 18,
}: KineticProjectGridProps) {
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

    if (prefersReducedMotion || !isDesktop) {
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
      });
      return;
    }

    let targetFactor = 0;
    let currentFactor = 0;
    let isTicking = false;
    let animFrameId: number;

    const updateTransforms = () => {
      // Lerp damping (0.10) for responsive physical weight and momentum
      currentFactor += (targetFactor - currentFactor) * 0.10;

      cards.forEach((card, i) => {
        if (cards.length === 3) {
          if (i === 0) {
            // Card 1 (Leftmost): Rolls top-to-bottom (+rotX) & glides upward (-transY)
            const rot = currentFactor * maxRotX;
            const transY = currentFactor * -maxParallaxY;
            const tz = Math.max(0, (1 - Math.abs(currentFactor)) * maxTransZ);
            const shadowAlpha = (0.10 + (1 - Math.abs(currentFactor)) * 0.05).toFixed(3);

            if (Math.abs(currentFactor) < 0.002) {
              card.style.transform = "";
              card.style.zIndex = "";
              card.style.boxShadow = "";
            } else {
              card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) translateZ(${tz.toFixed(1)}px)`;
              card.style.zIndex = "1";
              card.style.boxShadow = `0 18px 38px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.06)`;
            }
          } else if (i === 1) {
            // Card 2 (Middle): Strictly FIXED in place ("middle wala fix rhega")
            if (Math.abs(currentFactor) < 0.002) {
              card.style.transform = "";
              card.style.zIndex = "";
              card.style.boxShadow = "";
            } else {
              card.style.transform = `perspective(1400px) rotateX(0deg) translateY(0px) translateZ(0px)`;
              card.style.zIndex = "2";
              card.style.boxShadow = `0 22px 42px -10px rgba(10, 34, 57, 0.14), 0 6px 18px rgba(10, 34, 57, 0.06)`;
            }
          } else if (i === 2) {
            // Card 3 (Rightmost): Rolls in OPPOSITE direction (-rotX) & glides downward (+transY)
            const rot = -currentFactor * maxRotX;
            const transY = currentFactor * maxParallaxY;
            const tz = Math.max(0, (1 - Math.abs(currentFactor)) * maxTransZ);
            const shadowAlpha = (0.10 + (1 - Math.abs(currentFactor)) * 0.05).toFixed(3);

            if (Math.abs(currentFactor) < 0.002) {
              card.style.transform = "";
              card.style.zIndex = "";
              card.style.boxShadow = "";
            } else {
              card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) translateZ(${tz.toFixed(1)}px)`;
              card.style.zIndex = "1";
              card.style.boxShadow = `0 18px 38px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.06)`;
            }
          }
        } else if (cards.length === 2) {
          const rot = (i === 0 ? 1 : -1) * currentFactor * maxRotX;
          const transY = (i === 0 ? -1 : 1) * currentFactor * maxParallaxY;
          const tz = Math.max(0, (1 - Math.abs(currentFactor)) * maxTransZ);
          if (Math.abs(currentFactor) < 0.002) {
            card.style.transform = "";
            card.style.zIndex = "";
            card.style.boxShadow = "";
          } else {
            card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) translateZ(${tz.toFixed(1)}px)`;
            card.style.zIndex = "1";
            card.style.boxShadow = `0 18px 38px -10px rgba(10, 34, 57, 0.12), 0 4px 14px rgba(10, 34, 57, 0.06)`;
          }
        } else {
          const factor = i - (cards.length - 1) / 2;
          const rot = factor * currentFactor * (maxRotX / 1.5);
          const transY = -factor * currentFactor * (maxParallaxY / 1.5);
          if (Math.abs(currentFactor) < 0.002) {
            card.style.transform = "";
          } else {
            card.style.transform = `perspective(1400px) rotateX(${rot.toFixed(2)}deg) translateY(${transY.toFixed(1)}px)`;
          }
        }
      });

      if (Math.abs(targetFactor - currentFactor) > 0.0008) {
        animFrameId = window.requestAnimationFrame(updateTransforms);
      } else {
        isTicking = false;
      }
    };

    const handleScroll = () => {
      const rect = grid.getBoundingClientRect();
      const winHeight = window.innerHeight;

      if (rect.bottom > -150 && rect.top < winHeight + 150) {
        const gridCenter = rect.top + rect.height / 2;
        const viewportCenter = winHeight / 2;
        const span = (winHeight + rect.height) / 2;
        const dist = gridCenter - viewportCenter;

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
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
      });
    };
  }, [prefersReducedMotion, isDesktop, maxRotX, maxParallaxY, maxTransZ]);

  return (
    <div
      ref={gridRef}
      className={`project-grid project-grid--animated ${className}`}
    >
      {children}
    </div>
  );
}

