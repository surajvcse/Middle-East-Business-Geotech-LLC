"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

type CubertoCardSpreadProps = {
  children: React.ReactNode;
  className?: string;
  triggerStart?: number; // ratio of viewport height where unstacking begins (e.g. 0.96)
  triggerEnd?: number;   // ratio of viewport height where cards are fully spread (e.g. 0.16)
  rotations?: number[];
  scatters?: Array<{ x: number; y: number }>;
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
  const mq = window.matchMedia("(min-width: 54rem)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getIsDesktopSnapshot = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 54rem)").matches;
};

// Smooth organic deceleration curve (power-out with soft landing)
function easeOutCurve(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 2.6);
}

export function CubertoCardSpread({
  children,
  className = "",
  triggerStart = 0.96,
  triggerEnd = 0.16,
  rotations = [-7.0, 5.5, -4.0, 7.5],
  scatters = [
    { x: -18, y: -12 },
    { x: 16, y: -8 },
    { x: -12, y: 14 },
    { x: 18, y: 10 },
  ],
}: CubertoCardSpreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (typeof window === "undefined" || prefersReducedMotion || !isDesktop) {
      if (containerRef.current) {
        containerRef.current.removeAttribute("data-cuberto-state");
        const cards = Array.from(containerRef.current.children) as HTMLElement[];
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.zIndex = "";
          card.style.boxShadow = "";
          card.style.willChange = "";
        });
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    cards.forEach((card) => {
      card.style.transformOrigin = "center center";
    });

    let cardMetrics: Array<{
      distToCenterX: number;
      distToCenterY: number;
      rot: number;
      scatterX: number;
      scatterY: number;
      zIndex: number;
    }> = [];

    const measureMetrics = () => {
      const gridWidth = container.offsetWidth;
      const gridHeight = container.offsetHeight;
      const gridCenterX = gridWidth / 2;
      const gridCenterY = gridHeight / 2;

      cardMetrics = cards.map((card, i) => {
        const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
        const cardCenterY = card.offsetTop + card.offsetHeight / 2;
        return {
          distToCenterX: gridCenterX - cardCenterX,
          distToCenterY: gridCenterY - cardCenterY,
          rot: rotations[i % rotations.length] || 0,
          scatterX: scatters[i % scatters.length]?.x || 0,
          scatterY: scatters[i % scatters.length]?.y || 0,
          zIndex: i + 1,
        };
      });
    };

    measureMetrics();

    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;
    let animFrameId: number;
    let lastTime = 0;

    const computeTarget = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * triggerStart;
      const end = vh * triggerEnd;
      const raw = (start - rect.top) / (start - end);
      return Math.max(0, Math.min(1, raw));
    };

    targetProgress = computeTarget();
    currentProgress = targetProgress;

    const applyTransforms = (progress: number) => {
      // Seamlessly settle into standard CSS grid when fully unstacked
      if (progress >= 0.999) {
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.zIndex = "";
          card.style.boxShadow = "";
        });
        container.setAttribute("data-cuberto-state", "settled");
        return;
      }

      container.setAttribute("data-cuberto-state", "animating");

      const eased = easeOutCurve(progress);
      const stackFactor = Math.max(0, 1 - eased);

      cards.forEach((card, i) => {
        const m = cardMetrics[i];
        if (!m) return;

        const x = (m.distToCenterX + m.scatterX) * stackFactor;
        const y = (m.distToCenterY + m.scatterY) * stackFactor;
        const rot = m.rot * stackFactor;
        const scale = 1.0 - 0.038 * stackFactor;

        const shadowSpread = Math.round(14 + stackFactor * 18);
        const shadowBlur = Math.round(28 + stackFactor * 28);
        const shadowAlpha = (0.07 + stackFactor * 0.13).toFixed(3);

        card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.zIndex = `${m.zIndex}`;
        card.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -10px rgba(10, 34, 57, ${shadowAlpha}), 0 4px 14px rgba(10, 34, 57, 0.05)`;
      });
    };

    applyTransforms(currentProgress);

    const tick = (now: number) => {
      if (!lastTime) lastTime = now;
      const dt = Math.min(40, Math.max(8, now - lastTime));
      lastTime = now;

      // Time-delta normalized smoothing factor (0.082 base at 60fps)
      // Produces silky, liquid momentum independent of display refresh rate (60/120/144Hz)
      const factor = 1 - Math.pow(1 - 0.082, dt / 16.667);
      currentProgress += (targetProgress - currentProgress) * factor;

      const diff = Math.abs(targetProgress - currentProgress);
      if (diff < 0.0003) {
        currentProgress = targetProgress;
        applyTransforms(currentProgress);
        isTicking = false;
        lastTime = 0;
        return;
      }

      applyTransforms(currentProgress);
      animFrameId = window.requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      targetProgress = computeTarget();

      if (!isTicking) {
        isTicking = true;
        lastTime = performance.now();
        animFrameId = window.requestAnimationFrame(tick);
      }
    };

    const handleResize = () => {
      measureMetrics();
      targetProgress = computeTarget();
      currentProgress = targetProgress;
      applyTransforms(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Handle fonts or dynamic content layout shift
    const initialTimer = setTimeout(() => {
      measureMetrics();
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimer);
      if (animFrameId) {
        window.cancelAnimationFrame(animFrameId);
      }
      container.removeAttribute("data-cuberto-state");
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.boxShadow = "";
      });
    };
  }, [prefersReducedMotion, isDesktop, triggerStart, triggerEnd, rotations, scatters]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
