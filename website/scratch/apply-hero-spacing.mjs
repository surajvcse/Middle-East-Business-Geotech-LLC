import fs from "fs";

const filePath = "C:/Middle East Business Geotech LLC/website/src/app/globals.css";
let content = fs.readFileSync(filePath, "utf8");

// 1. Update .hero-cinematic
content = content.replace(
  /\.hero-cinematic \{[\s\S]*?padding-top:[^;]+;\s*\}/,
  `.hero-cinematic {
  position: relative;
  min-height: calc(100vh - 6.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #061220;
  overflow: hidden;
  padding-top: clamp(2.25rem, 5vh, 4rem);
}`
);

// 2. Update .hero-cinematic__stage, .hero-cinematic__content, and internal margins
content = content.replace(
  /\.hero-cinematic__stage \{[\s\S]*?padding-bottom:[^;]+;\s*\}/,
  `.hero-cinematic__stage {
  position: relative;
  z-index: 10;
  width: 100%;
  padding-top: clamp(0.75rem, 2vh, 1.75rem);
  padding-inline: clamp(1.5rem, 4vw, 3.5rem);
  padding-bottom: 0.75rem;
}`
);

// 3. Update eyebrow margin
content = content.replace(
  /margin-bottom: 0\.65rem;(\s*\/\* Dynamic)/,
  "margin-bottom: 0.95rem;$1"
);

// 4. Update summary margin
content = content.replace(
  /\.hero-cinematic__summary \{[\s\S]*?margin:[^;]+;/,
  `.hero-cinematic__summary {
  margin: 0.75rem 0 0;`
);

// 5. Update actions margin
content = content.replace(
  /\.hero-cinematic__actions \{[\s\S]*?margin-top:[^;]+;/,
  `.hero-cinematic__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.35rem;`
);

// 6. Update trust cue margin
content = content.replace(
  /\.hero-cinematic__trust-cue \{[\s\S]*?margin-top:[^;]+;/,
  `.hero-cinematic__trust-cue {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 1.15rem;`
);

// 7. Update .hero-dock__container to match stage padding-inline
content = content.replace(
  /\.hero-dock__container \{[\s\S]*?padding-bottom:[^;]+;\s*\}/,
  `.hero-dock__container {
  padding-top: 0.35rem;
  padding-inline: clamp(1.5rem, 4vw, 3.5rem);
  padding-bottom: clamp(0.75rem, 1.5vw, 1.25rem);
}`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully updated hero spacing in globals.css!");

