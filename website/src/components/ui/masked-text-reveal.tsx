"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export type MaskedTextRevealProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  type?: "lines" | "words" | "chars";
  duration?: number;
  stagger?: number;
  delay?: number;
  trigger?: "scroll" | "load" | "manual";
  scrollStart?: string;
  ease?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
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

export function MaskedTextReveal({
  children,
  as: Component = "h2",
  type = "lines",
  duration = 1.15,
  stagger = 0.09,
  delay = 0,
  trigger = "scroll",
  scrollStart = "top 85%",
  ease = "power3.out",
  id,
  className = "",
  style,
  onComplete,
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // Extract raw text for clean accessibility label
  const rawText = typeof children === "string" ? children : undefined;

  useEffect(() => {
    // If reduced motion is preferred or SSR, skip animation
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    let splitInstance: SplitText | null = null;
    let animTimeline: gsap.core.Timeline | null = null;
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let resizeTimer: NodeJS.Timeout;
    let lastWidth = el.offsetWidth;
    let isDisposed = false;

    const setupAndAnimate = () => {
      if (isDisposed || !el) return;

      // 1. Clean up any previous split / animation before re-splitting
      if (splitInstance) {
        splitInstance.revert();
        splitInstance = null;
      }
      if (animTimeline) {
        animTimeline.kill();
        animTimeline = null;
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }

      // 2. Perform GSAP SplitText
      splitInstance = new SplitText(el, {
        type: type,
        linesClass: "masked-text__line-inner",
        wordsClass: "masked-text__word-inner",
        charsClass: "masked-text__char-inner",
      });

      const rawTargets =
        type === "chars"
          ? splitInstance.chars
          : type === "words"
          ? splitInstance.words
          : splitInstance.lines;

      const targets = (rawTargets || []) as HTMLElement[];

      if (targets.length === 0) return;

      // 3. Wrap each split element in an overflow-hidden mask
      const isBlockLevel = type === "lines";
      targets.forEach((target) => {
        const mask = document.createElement("span");
        mask.className = `masked-text__mask masked-text__mask--${type}`;
        mask.style.overflow = "hidden";
        mask.style.display = isBlockLevel ? "block" : "inline-block";
        mask.style.verticalAlign = "bottom";

        target.parentNode?.insertBefore(mask, target);
        mask.appendChild(target);

        target.style.display = isBlockLevel ? "block" : "inline-block";
        target.style.willChange = "transform";
      });

      // 4. Initial state: submerged 105% under the mask edge
      gsap.set(targets, { yPercent: 105 });

      // 5. Create the reveal timeline
      animTimeline = gsap.timeline({
        paused: trigger === "scroll",
        delay: trigger === "load" ? delay : 0,
        onComplete: () => {
          targets.forEach((t) => {
            t.style.willChange = "auto";
          });
          onComplete?.();
        },
      });

      animTimeline.to(targets, {
        yPercent: 0,
        duration: duration,
        ease: ease,
        stagger: stagger,
      });

      // 6. Connect ScrollTrigger for below-the-fold sections
      if (trigger === "scroll") {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: el,
          start: scrollStart,
          once: true,
          onEnter: () => {
            if (delay > 0) {
              gsap.delayedCall(delay, () => animTimeline?.play());
            } else {
              animTimeline?.play();
            }
          },
        });

        // Fail-safe: If already in or past the trigger zone on initial mount/split, play immediately
        if (scrollTriggerInstance.progress > 0) {
          animTimeline.play();
        }
      } else if (trigger === "load") {
        animTimeline.play();
      }
    };

    // Ensure fonts are loaded before splitting so line breaks are pixel-perfect
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!isDisposed) {
          setupAndAnimate();
        }
      });
    } else {
      setupAndAnimate();
    }

    // Handle responsive text reflow on window resize (debounced)
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isDisposed || !el) return;
        if (Math.abs(el.offsetWidth - lastWidth) > 8) {
          lastWidth = el.offsetWidth;
          setupAndAnimate();
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (animTimeline) animTimeline.kill();
      if (splitInstance) splitInstance.revert();
    };
  }, [type, duration, stagger, delay, trigger, scrollStart, ease, prefersReducedMotion, onComplete]);

  return React.createElement(
    Component,
    {
      id,
      ref: containerRef,
      className: `masked-text-reveal ${className}`.trim(),
      style: { ...style },
      "aria-label": rawText,
    },
    children
  );
}

