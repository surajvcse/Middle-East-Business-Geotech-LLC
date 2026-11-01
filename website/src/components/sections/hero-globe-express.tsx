"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

import type { company } from "@/content/company";
import type { Project } from "@/types/content";

const CARD_LOCATION_LABEL: Record<string, string> = {
  "al-ubaidah-fayyad-road": "Buraimi",
  "khasab-lima-road": "Musandam",
  "wilayat-manah": "Nizwa",
  "al-kamil-sur-road": "Al Sharqiyah",
  "al-sharqiyah-region": "Sharqiyah North",
};

const PROJECT_BG_POSITION: Record<string, string> = {
  "al-ubaidah-fayyad-road": "center 68%",
  "khasab-lima-road": "40% 55%",
  "wilayat-manah": "center 62%",
  "al-kamil-sur-road": "center 50%",
  "al-sharqiyah-region": "center 60%",
};

type HeroGlobeExpressProps = {
  projects: readonly Project[];
  company: typeof company;
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

export function HeroGlobeExpress({ projects, company }: HeroGlobeExpressProps) {
  const activeDisplayIndex = 0;

  const heroRef = useRef<HTMLElement>(null);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paginationRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterActiveRef = useRef<HTMLSpanElement>(null);
  const scrollCueRef = useRef<HTMLButtonElement>(null);

  const orderRef = useRef<number[]>(Array.from({ length: projects.length }, (_, i) => i));
  const stepRef = useRef<(forward?: boolean) => void>(() => {});
  const detailsEvenFlagRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const timerTweenRef = useRef<gsap.core.Tween | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const total = projects.length;

  // Helper to populate a details container with project data
  const updateDetailsDOM = useCallback((container: HTMLDivElement, project: Project) => {
    const eyebrowEl = container.querySelector<HTMLElement>(".hero-gx__eyebrow-text");
    if (eyebrowEl) {
      eyebrowEl.textContent = `${project.location.toUpperCase()} · ${(project.quickStat || project.scope).toUpperCase()}`;
    }
    const titleEl = container.querySelector<HTMLElement>(".hero-gx__title");
    if (titleEl) {
      titleEl.textContent = project.shortTitle || project.title;
    }
    const descEl = container.querySelector<HTMLElement>(".hero-gx__description");
    if (descEl) {
      descEl.textContent = project.challenge || project.scope;
    }
    const pillEls = container.querySelectorAll<HTMLElement>(".hero-gx__tech-pill");
    const techs = project.keyTechniques || [];
    pillEls.forEach((pill, idx) => {
      if (techs[idx]) {
        pill.textContent = techs[idx];
        pill.style.display = "inline-block";
      } else {
        pill.textContent = "";
        pill.style.display = "none";
      }
    });
    const circleLink = container.querySelector<HTMLAnchorElement>(".hero-gx__btn-circle");
    if (circleLink) {
      circleLink.href = `/projects/${project.slug}`;
      circleLink.setAttribute("aria-label", `View details of ${project.title}`);
    }
    const pillLink = container.querySelector<HTMLAnchorElement>(".hero-gx__btn-pill");
    if (pillLink) {
      pillLink.href = `/projects/${project.slug}`;
    }
  }, []);

  // Compute exact layout metrics
  const getLayoutMetrics = useCallback(() => {
    if (typeof window === "undefined") {
      return {
        width: 1440,
        height: 800,
        cardWidth: 205,
        cardHeight: 290,
        gap: 18,
        offsetLeft: 720,
        offsetTop: 240,
        detailsLeft: 48,
        detailsTop: 210,
        contentHeight: 110,
        paginationTop: 550,
        isMobile: false,
      };
    }
    const heroEl = heroRef.current;
    const width = heroEl ? heroEl.clientWidth : window.innerWidth;
    const height = heroEl ? heroEl.clientHeight : window.innerHeight;
    const isMobile = width < 900;
    const isCompactHeight = height < 740;
    const isNarrow = width < 1180;

    const cardWidth = isMobile ? 140 : isCompactHeight || isNarrow ? 170 : 205;
    const cardHeight = isMobile ? 190 : isCompactHeight || isNarrow ? 240 : 290;
    const gap = isMobile ? 12 : isCompactHeight || isNarrow ? 14 : 18;
    const contentHeight = isMobile ? 86 : 110;

    const maxContainer = 1360;
    const padLeft = Math.max(isMobile ? 16 : 28, (width - maxContainer) / 2 + (isMobile ? 16 : 28));

    // Left text is max 410px. Ensure cards begin with a clean gap and never overlap:
    let offsetLeft = isMobile ? padLeft : Math.max(padLeft + 425, width * 0.47);

    if (!isMobile && offsetLeft + cardWidth * 2 + gap > width - 16) {
      offsetLeft = Math.max(padLeft + 350, width - (cardWidth + gap) * 2 - 24);
    }

    const activeDetails = detailsEvenFlagRef.current ? detailsEvenRef.current : detailsOddRef.current;
    const detailsHeight = activeDetails?.offsetHeight || (isCompactHeight ? 260 : 320);

    let detailsTop: number;
    let offsetTop: number;
    let paginationTop: number;

    if (isMobile) {
      const scrollCueHeight = 32;
      const gapScrollToPagination = 12;
      const paginationHeight = 38;
      const cardGapToPagination = 12;
      const detailsGapToCard = 14;
      const mobileDetailsHeight = 168;

      const totalBlockHeight =
        mobileDetailsHeight +
        detailsGapToCard +
        cardHeight +
        cardGapToPagination +
        paginationHeight +
        gapScrollToPagination +
        scrollCueHeight;
      const freeSpace = Math.max(0, height - totalBlockHeight);
      const startY = Math.max(32, Math.round(freeSpace * 0.52));

      detailsTop = Math.round(startY);
      offsetTop = Math.round(detailsTop + mobileDetailsHeight + detailsGapToCard);
      paginationTop = Math.round(offsetTop + cardHeight + cardGapToPagination);
    } else {
      detailsTop = Math.max(
        16,
        Math.round(height * 0.5 - detailsHeight * 0.5 - (isCompactHeight ? 24 : 32))
      );
      offsetTop = Math.max(
        16,
        Math.round(height * 0.5 - cardHeight * 0.5 - (isCompactHeight ? 25 : 30))
      );
      paginationTop = offsetTop + cardHeight + (isCompactHeight ? 14 : 20);
    }

    return {
      width,
      height,
      cardWidth,
      cardHeight,
      gap,
      offsetLeft,
      offsetTop,
      detailsLeft: padLeft,
      detailsTop,
      contentHeight,
      paginationTop,
      isMobile,
    };
  }, []);

  // Master Step Function (Shared Element Expanding Animation)
  const step = useCallback(
    (forward = true) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
      }

      const { width, height, cardWidth, cardHeight, gap, offsetLeft, offsetTop, detailsLeft, detailsTop, contentHeight, isMobile } =
        getLayoutMetrics();
      const order = orderRef.current;

      if (forward) {
        order.push(order.shift()!);
      } else {
        order.unshift(order.pop()!);
      }

      const [active, ...rest] = order;
      const prv = forward ? rest[rest.length - 1] : order[1];

      // 1. Swap and animate details containers
      detailsEvenFlagRef.current = !detailsEvenFlagRef.current;
      const detailsActive = detailsEvenFlagRef.current
        ? detailsEvenRef.current
        : detailsOddRef.current;
      const detailsInactive = detailsEvenFlagRef.current
        ? detailsOddRef.current
        : detailsEvenRef.current;

      if (detailsActive) {
        updateDetailsDOM(detailsActive, projects[active]);
        gsap.set(detailsActive, {
          left: detailsLeft,
          top: detailsTop,
          zIndex: 26,
          opacity: 1,
          pointerEvents: "auto",
        });

        const eyebrow = detailsActive.querySelector(".hero-gx__eyebrow-row");
        const title = detailsActive.querySelector(".hero-gx__title");
        const desc = detailsActive.querySelector(".hero-gx__description");
        const pills = detailsActive.querySelectorAll(".hero-gx__tech-pill");
        const actions = detailsActive.querySelector(".hero-gx__actions");

        gsap.fromTo(
          eyebrow,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(
          title,
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, delay: 0.15, ease: "power3.out" }
        );
        gsap.fromTo(
          desc,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: "power2.out" }
        );
        if (pills.length > 0) {
          gsap.fromTo(
            pills,
            { y: 16, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.45,
              delay: 0.32,
              stagger: 0.05,
              ease: "back.out(1.5)",
            }
          );
        }
        gsap.fromTo(
          actions,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, delay: 0.38, ease: "power2.out" }
        );
      }

      if (detailsInactive) {
        gsap.set(detailsInactive, { zIndex: 24, pointerEvents: "none" });
        gsap.to(detailsInactive, {
          opacity: 0,
          y: -22,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(detailsInactive, { y: 0 });
          },
        });
      }

      // 2. Card layering and expansion
      const prvCard = cardRefs.current[prv];
      const activeCard = cardRefs.current[active];
      const activeContent = cardContentRefs.current[active];

      if (prvCard) {
        gsap.set(prvCard, { zIndex: 10 });
        gsap.to(prvCard, { scale: 1.15, duration: 1.1, ease: "sine.inOut" });
      }

      if (activeContent) {
        gsap.to(activeContent, {
          y: offsetTop + cardHeight - 20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      if (activeCard) {
        gsap.set(activeCard, { zIndex: 20 });
        gsap.to(activeCard, {
          x: 0,
          y: 0,
          width: width,
          height: height,
          borderRadius: 0,
          duration: 1.1,
          ease: "sine.inOut",
          onComplete: () => {
            // Reset old background card (prv) into the LAST slot of the conveyor track
            if (prvCard) {
              const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
              gsap.set(prvCard, {
                x: xNew,
                y: offsetTop,
                width: cardWidth,
                height: cardHeight,
                zIndex: 30,
                borderRadius: isMobile ? 14 : 18,
                scale: 1,
                opacity: 1,
              });
              const prvContent = cardContentRefs.current[prv];
              if (prvContent) {
                gsap.set(prvContent, {
                  x: xNew,
                  y: offsetTop + cardHeight - contentHeight,
                  width: cardWidth,
                  height: contentHeight,
                  opacity: 1,
                  zIndex: 35,
                  pointerEvents: "auto",
                });
              }
            }
            isTransitioningRef.current = false;

            // Restart auto-play timer
            if (!prefersReducedMotion && progressBarRef.current) {
              gsap.set(progressBarRef.current, { width: "0%" });
              timerTweenRef.current = gsap.to(progressBarRef.current, {
                width: "100%",
                duration: 4.2,
                ease: "linear",
                onComplete: () => {
                  stepRef.current(true);
                },
              });
            }
          },
        });
      }

      // 3. Conveyor slide for all other preview cards
      rest.forEach((cardIdx, slotIdx) => {
        if (cardIdx !== prv) {
          const cardEl = cardRefs.current[cardIdx];
          const contentEl = cardContentRefs.current[cardIdx];
          const xNew = offsetLeft + slotIdx * (cardWidth + gap);

          if (cardEl) {
            gsap.set(cardEl, { zIndex: 30 });
            gsap.to(cardEl, {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              duration: 0.9,
              ease: "sine.inOut",
              delay: 0.05 * (slotIdx + 1),
            });
          }
          if (contentEl) {
            gsap.to(contentEl, {
              x: xNew,
              y: offsetTop + cardHeight - contentHeight,
              opacity: 1,
              zIndex: 35,
              duration: 0.9,
              ease: "sine.inOut",
              delay: 0.05 * (slotIdx + 1),
            });
          }
        }
      });

      // 4. Update slide counter with an odometer roll
      if (counterActiveRef.current) {
        const el = counterActiveRef.current;
        gsap.fromTo(
          el,
          { y: -12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            delay: 0.15,
            ease: "power2.out",
            onStart: () => {
              el.textContent = String(active + 1).padStart(2, "0");
            },
          }
        );
      }
    },
    [getLayoutMetrics, prefersReducedMotion, projects, updateDetailsDOM]
  );

  const nextSlide = useCallback(() => {
    step(true);
  }, [step]);

  const prevSlide = useCallback(() => {
    step(false);
  }, [step]);

  const handleScrollDown = useCallback(() => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const targetY = window.scrollY + heroRect.bottom;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  }, []);

  // Initial layout mount and resize listener
  useEffect(() => {
    const { width, height, cardWidth, cardHeight, gap, offsetLeft, offsetTop, detailsLeft, detailsTop, contentHeight, paginationTop, isMobile } =
      getLayoutMetrics();
    const order = orderRef.current;
    const [active, ...rest] = order;

    // Position active card as full-screen background
    const activeCard = cardRefs.current[active];
    if (activeCard) {
      gsap.set(activeCard, {
        x: 0,
        y: 0,
        width,
        height,
        borderRadius: 0,
        zIndex: 20,
        scale: 1,
        opacity: 1,
      });
    }
    const activeContent = cardContentRefs.current[active];
    if (activeContent) {
      gsap.set(activeContent, { opacity: 0, pointerEvents: "none" });
    }

    // Position preview cards
    rest.forEach((cardIdx, slotIdx) => {
      const cardEl = cardRefs.current[cardIdx];
      const contentEl = cardContentRefs.current[cardIdx];
      const xPos = offsetLeft + slotIdx * (cardWidth + gap);

      if (cardEl) {
        gsap.set(cardEl, {
          x: xPos,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: isMobile ? 14 : 18,
          zIndex: 30,
          scale: 1,
          opacity: 1,
        });
      }
      if (contentEl) {
        gsap.set(contentEl, {
          x: xPos,
          y: offsetTop + cardHeight - contentHeight,
          width: cardWidth,
          height: contentHeight,
          zIndex: 35,
          opacity: 1,
          pointerEvents: "auto",
        });
      }
    });

    // Initialize details containers
    const detailsEven = detailsEvenRef.current;
    const detailsOdd = detailsOddRef.current;
    if (detailsEven) {
      updateDetailsDOM(detailsEven, projects[active]);
      gsap.set(detailsEven, {
        left: detailsLeft,
        top: detailsTop,
        opacity: 1,
        zIndex: 26,
        pointerEvents: "auto",
      });
    }
    if (detailsOdd) {
      gsap.set(detailsOdd, {
        left: detailsLeft,
        top: detailsTop,
        opacity: 0,
        zIndex: 24,
        pointerEvents: "none",
      });
    }

    // Initialize pagination
    const paginationEl = paginationRef.current;
    if (paginationEl) {
      gsap.set(paginationEl, {
        left: offsetLeft,
        top: paginationTop,
        opacity: 1,
        zIndex: 60,
      });
    }

    // Initialize counter
    if (counterActiveRef.current) {
      counterActiveRef.current.textContent = String(active + 1).padStart(2, "0");
    }

    // Position scroll cue
    if (scrollCueRef.current) {
      if (isMobile) {
        gsap.set(scrollCueRef.current, {
          left: "50%",
          xPercent: -50,
          top: paginationTop + 48,
          bottom: "auto",
        });
      } else {
        gsap.set(scrollCueRef.current, {
          left: "50%",
          xPercent: -50,
          top: "auto",
          bottom: 46,
        });
      }
    }

    stepRef.current = step;

    // Start auto-play timer
    if (!prefersReducedMotion && progressBarRef.current) {
      gsap.set(progressBarRef.current, { width: "0%" });
      timerTweenRef.current = gsap.to(progressBarRef.current, {
        width: "100%",
        duration: 4.2,
        ease: "linear",
        onComplete: () => {
          stepRef.current(true);
        },
      });
    }

    // Resize handler
    const handleResize = () => {
      if (isTransitioningRef.current) return;
      const m = getLayoutMetrics();
      const currentOrder = orderRef.current;
      const [currActive, ...currRest] = currentOrder;

      const currActiveCard = cardRefs.current[currActive];
      if (currActiveCard) {
        gsap.set(currActiveCard, {
          width: m.width,
          height: m.height,
        });
      }

      currRest.forEach((cIdx, sIdx) => {
        const cEl = cardRefs.current[cIdx];
        const ctEl = cardContentRefs.current[cIdx];
        const xPos = m.offsetLeft + sIdx * (m.cardWidth + m.gap);

        if (cEl) {
          gsap.set(cEl, {
            x: xPos,
            y: m.offsetTop,
            width: m.cardWidth,
            height: m.cardHeight,
            borderRadius: m.isMobile ? 14 : 18,
          });
        }
        if (ctEl) {
          gsap.set(ctEl, {
            x: xPos,
            y: m.offsetTop + m.cardHeight - m.contentHeight,
            width: m.cardWidth,
            height: m.contentHeight,
          });
        }
      });

      if (detailsEvenRef.current) gsap.set(detailsEvenRef.current, { left: m.detailsLeft, top: m.detailsTop });
      if (detailsOddRef.current) gsap.set(detailsOddRef.current, { left: m.detailsLeft, top: m.detailsTop });
      if (paginationRef.current) {
        gsap.set(paginationRef.current, {
          left: m.offsetLeft,
          top: m.paginationTop,
        });
      }
      if (scrollCueRef.current) {
        if (m.isMobile) {
          gsap.set(scrollCueRef.current, {
            left: "50%",
            xPercent: -50,
            top: m.paginationTop + 48,
            bottom: "auto",
          });
        } else {
          gsap.set(scrollCueRef.current, {
            left: "50%",
            xPercent: -50,
            top: "auto",
            bottom: 46,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
      }
    };
  }, [getLayoutMetrics, prefersReducedMotion, projects, step, updateDetailsDOM]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartXRef.current = null;
  };

  // Click on a preview card in the conveyor
  const handleCardClick = (clickedIdx: number) => {
    if (isTransitioningRef.current) return;
    const order = orderRef.current;
    if (order[0] === clickedIdx) return;
    // Step forward to this card
    step(true);
  };

  const currentProject = projects[activeDisplayIndex] || projects[0];

  return (
    <section
      ref={heroRef}
      className="hero-gx"
      aria-label="Geotechnical Engineering Projects Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. CARDS LAYER: Persistent shared-element DOM cards */}
      <div className="hero-gx__cards-layer">
        {projects.map((proj, idx) => {
          const imageSrc = proj.images[0]?.src || "/images/projects/khasab-lima-road-01.jpeg";
          const bgPos = PROJECT_BG_POSITION[proj.slug] || "center center";

          return (
            <div
              key={proj.slug}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="hero-gx__card"
              id={`hero-card-${idx}`}
              onClick={() => handleCardClick(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${proj.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(idx);
                }
              }}
            >
              <Image
                src={imageSrc}
                alt={proj.title}
                fill
                priority={idx === 0 || idx === 1}
                sizes="100vw"
                className="hero-gx__card-img"
                style={{
                  objectFit: "cover",
                  objectPosition: bgPos,
                }}
              />
              <div className="hero-gx__card-scrim" />
            </div>
          );
        })}
      </div>

      {/* 2. OVERLAY TITLES FOR PREVIEW CARDS */}
      {projects.map((proj, idx) => (
        <div
          key={`content-${proj.slug}`}
          ref={(el) => {
            cardContentRefs.current[idx] = el;
          }}
          className="hero-gx__card-content"
          id={`hero-card-content-${idx}`}
          onClick={() => handleCardClick(idx)}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="hero-gx__card-badge">{CARD_LOCATION_LABEL[proj.slug] || proj.governorate || "Oman"}</span>
          <h2 className="hero-gx__card-title">{proj.shortTitle || proj.title}</h2>
          <span className="hero-gx__card-tag">{proj.quickStat || proj.scope}</span>
        </div>
      ))}

      {/* 3. CINEMATIC BACKGROUND VIGNETTE (z-index: 21, between active card and text) */}
      <div className="hero-gx__vignette" aria-hidden="true" />

      {/* 4. TWO ALTERNATING EDITORIAL DETAIL CONTAINERS (z-index: 25) */}
      <div ref={detailsEvenRef} id="details-even" className="hero-gx__details">
        <div className="hero-gx__eyebrow-row">
          <span className="hero-gx__eyebrow-dash" aria-hidden="true">—</span>
          <span className="hero-gx__eyebrow-text">
            {currentProject.location.toUpperCase()} · {(currentProject.quickStat || currentProject.scope).toUpperCase()}
          </span>
        </div>

        <div className="hero-gx__title-wrapper">
          <h1 className="hero-gx__title">
            {currentProject.shortTitle || currentProject.title}
          </h1>
        </div>

        <div className="hero-gx__desc-wrapper">
          <p className="hero-gx__description">
            {currentProject.challenge || currentProject.scope}
          </p>
        </div>

        <div className="hero-gx__techniques">
          <span className="hero-gx__tech-pill" />
          <span className="hero-gx__tech-pill" />
          <span className="hero-gx__tech-pill" />
        </div>

        <div className="hero-gx__actions">
          <Link
            href={`/projects/${currentProject.slug}`}
            className="hero-gx__btn-circle"
            aria-label={`View details of ${currentProject.title}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link href={`/projects/${currentProject.slug}`} className="hero-gx__btn-pill">
            <span>View Project Record</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <Link href="/contact" className="hero-gx__btn-ghost">
            Request Consultation
          </Link>
        </div>
      </div>

      <div ref={detailsOddRef} id="details-odd" className="hero-gx__details" style={{ opacity: 0 }}>
        <div className="hero-gx__eyebrow-row">
          <span className="hero-gx__eyebrow-dash" aria-hidden="true">—</span>
          <span className="hero-gx__eyebrow-text">
            {currentProject.location.toUpperCase()} · {(currentProject.quickStat || currentProject.scope).toUpperCase()}
          </span>
        </div>

        <div className="hero-gx__title-wrapper">
          <h1 className="hero-gx__title">
            {currentProject.shortTitle || currentProject.title}
          </h1>
        </div>

        <div className="hero-gx__desc-wrapper">
          <p className="hero-gx__description">
            {currentProject.challenge || currentProject.scope}
          </p>
        </div>

        <div className="hero-gx__techniques">
          <span className="hero-gx__tech-pill" />
          <span className="hero-gx__tech-pill" />
          <span className="hero-gx__tech-pill" />
        </div>

        <div className="hero-gx__actions">
          <Link
            href={`/projects/${currentProject.slug}`}
            className="hero-gx__btn-circle"
            aria-label={`View details of ${currentProject.title}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link href={`/projects/${currentProject.slug}`} className="hero-gx__btn-pill">
            <span>View Project Record</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <Link href="/contact" className="hero-gx__btn-ghost">
            Request Consultation
          </Link>
        </div>
      </div>

      {/* 5. SLIDER CONTROLS & TIMED PROGRESS (DIRECTLY UNDER PREVIEW CARDS) */}
      <div ref={paginationRef} className="hero-gx__pagination">
        <div className="hero-gx__nav-buttons">
          <button
            type="button"
            className="hero-gx__nav-btn"
            onClick={prevSlide}
            aria-label="Previous project slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="hero-gx__nav-btn"
            onClick={nextSlide}
            aria-label="Next project slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* LIQUID PROGRESS INDICATOR */}
        <div className="hero-gx__progress-rail" aria-hidden="true">
          <div ref={progressBarRef} className="hero-gx__progress-bar" />
        </div>

        {/* SLIDE COUNTER NUMERALS */}
        <div className="hero-gx__counter">
          <span ref={counterActiveRef} className="hero-gx__counter-active">
            01
          </span>
          <span className="hero-gx__counter-divider">/</span>
          <span className="hero-gx__counter-total">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <span className="hero-gx__status-tag">
          CR {company.crNumber} · Muscat Yard Active
        </span>
      </div>
      {/* 6. PROFESSIONAL SCROLL-DOWN CUE (Indicating content below) */}
      <button
        ref={scrollCueRef}
        type="button"
        className="hero-gx__scroll-cue"
        onClick={handleScrollDown}
        aria-label="Scroll to company overview"
      >
        <span className="hero-gx__scroll-cue-inner">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
    </section>
  );
}
