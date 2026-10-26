"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "difficult ground.",
  "steep rock slopes.",
  "deep foundations.",
  "critical infrastructure.",
  "complex Oman geology.",
];

export function DynamicHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <h1 id="hero-title" className="hero__headline">
      <span className="hero__headline-static">Geotechnical solutions for </span>
      <span className="hero__dynamic-slot">
        <span className="hero__dynamic-text">{displayText}</span>
        <span className="hero__cursor" aria-hidden="true" />
      </span>
      <span className="sr-only">
        Geotechnical solutions engineered for difficult ground, steep rock slopes, deep foundations, critical infrastructure, and complex Oman geology.
      </span>
    </h1>
  );
}
