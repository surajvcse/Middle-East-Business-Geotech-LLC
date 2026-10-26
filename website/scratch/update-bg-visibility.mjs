import fs from "fs";

const filePath = "C:/Middle East Business Geotech LLC/website/src/app/globals.css";
let content = fs.readFileSync(filePath, "utf8");

// 1. Update .hero-cinematic__bg-image
content = content.replace(
  /\.hero-cinematic__bg-image \{[\s\S]*?transform: scale\(1\.0\);\s*\}/,
  `.hero-cinematic__bg-image {
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 7.5s cubic-bezier(0.25, 1, 0.5, 1);
  filter: brightness(0.96) contrast(1.08) saturate(1.08);
}

.hero-cinematic__bg-slide--active .hero-cinematic__bg-image {
  transform: scale(1.0);
}`
);

// 2. Update Overlays: vignette, gradient, bottom
content = content.replace(
  /\.hero-cinematic__overlay-vignette \{[\s\S]*?background: radial-gradient\([^;]+;\s*\}/,
  `.hero-cinematic__overlay-vignette {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(circle at 62% 40%, transparent 40%, rgba(4, 12, 22, 0.40) 100%);
}`
);

content = content.replace(
  /\.hero-cinematic__overlay-gradient \{[\s\S]*?background: linear-gradient\([\s\S]*?\);\s*\}/,
  `.hero-cinematic__overlay-gradient {
  position: absolute;
  inset: 0;
  z-index: 4;
  background: linear-gradient(
    90deg,
    rgba(6, 18, 32, 0.82) 0%,
    rgba(6, 18, 32, 0.68) 32%,
    rgba(8, 24, 42, 0.16) 58%,
    rgba(6, 18, 32, 0.38) 100%
  );
}`
);

content = content.replace(
  /\.hero-cinematic__overlay-bottom \{[\s\S]*?background: linear-gradient\([^;]+;\s*\}/,
  `.hero-cinematic__overlay-bottom {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 32%;
  z-index: 5;
  background: linear-gradient(to top, rgba(6, 18, 32, 0.90) 0%, rgba(6, 18, 32, 0.28) 50%, transparent 100%);
}`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully refined background visibility in globals.css!");

