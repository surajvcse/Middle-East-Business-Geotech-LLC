import fs from "fs";

const filePath = "C:/Middle East Business Geotech LLC/website/src/app/globals.css";
let content = fs.readFileSync(filePath, "utf8");

// 1. Reduce .hero-dock opacity from 0.78 to 0.45
content = content.replace(
  /\.hero-dock \{[\s\S]*?border-top: 1px solid rgba\(255, 255, 255, 0\.12\);\s*\}/,
  `.hero-dock {
  position: relative;
  z-index: 10;
  width: 100%;
  margin-top: auto;
  background: rgba(6, 18, 32, 0.45);
  backdrop-filter: blur(20px) saturate(1.15);
  -webkit-backdrop-filter: blur(20px) saturate(1.15);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}`
);

// 2. Reduce .hero-cinematic__overlay-bottom opacity
content = content.replace(
  /\.hero-cinematic__overlay-bottom \{[\s\S]*?background: linear-gradient\([^;]+;\s*\}/,
  `.hero-cinematic__overlay-bottom {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 28%;
  z-index: 5;
  background: linear-gradient(to top, rgba(6, 18, 32, 0.55) 0%, rgba(6, 18, 32, 0.16) 55%, transparent 100%);
}`
);

// 3. Center dome and cards opacity
content = content.replace(
  /\.hero-dock__center-dome \{[\s\S]*?background: rgba\(6, 20, 36, [0-9.]+\);/,
  `.hero-dock__center-dome {
  position: relative;
  background: rgba(6, 20, 36, 0.72);`
);

content = content.replace(
  /\.hero-dock__card \{[\s\S]*?background: rgba\(8, 24, 40, [0-9.]+\);/,
  `.hero-dock__card {
  display: flex;
  flex-direction: column;
  background: rgba(8, 24, 40, 0.60);`
);

// 4. Update Emblem and add Scroll Down Affordance Styles
content = content.replace(
  /\.hero-dock__center-emblem \{[\s\S]*?color: var\(--accent\);\s*\}/,
  `.hero-dock__center-emblem,
.hero-dock__scroll-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.hero-dock__emblem-pulse {
  position: absolute;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(217, 107, 43, 0.45) 0%, transparent 70%);
  filter: blur(8px);
  animation: pulseBeacon 2.8s infinite ease-in-out;
}

.hero-dock__emblem-disc {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  background: rgba(10, 34, 57, 0.95);
  border: 1.5px solid rgba(217, 107, 43, 0.6);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4), 0 0 8px rgba(217, 107, 43, 0.35);
  color: var(--accent);
  transition: all 200ms ease;
}

.hero-dock__scroll-btn:hover .hero-dock__emblem-disc {
  background: rgba(217, 107, 43, 0.25);
  border-color: var(--accent);
  box-shadow: 0 0 14px rgba(217, 107, 43, 0.6);
  transform: translateY(2px);
}

.hero-dock__down-arrow {
  animation: heroArrowBounce 2s infinite ease-in-out;
  transition: transform 180ms ease;
}

@keyframes heroArrowBounce {
  0%, 100% {
    transform: translateY(-1.5px);
  }
  50% {
    transform: translateY(2px);
  }
}`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully updated dock opacity and scroll indication arrow styles in globals.css!");
