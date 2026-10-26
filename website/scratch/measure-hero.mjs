import { spawn } from "child_process";
import http from "http";
import fs from "fs";

const port = 9630;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1366,768",
  "http://localhost:3000/"
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let raw = "";
    res.on("data", (c) => (raw += c));
    res.on("end", () => {
      const tabs = JSON.parse(raw);
      const tab = tabs.find((t) => t.url.includes("localhost:3000")) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      ws.onopen = () => {
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              id: 1,
              method: "Runtime.evaluate",
              params: {
                returnByValue: true,
                expression: `(() => {
                  const stage = document.querySelector(".hero-cinematic__stage");
                  const dock = document.querySelector(".hero-dock");
                  const nav = document.querySelector(".site-header") || document.querySelector("header");
                  const hero = document.querySelector(".hero-cinematic");
                  const rightCard = document.querySelector(".hero-cinematic__telemetry-card");
                  const eyebrow = document.querySelector(".hero-cinematic__eyebrow");
                  const headline = document.querySelector(".hero-cinematic__title");
                  return {
                    viewportHeight: window.innerHeight,
                    viewportWidth: window.innerWidth,
                    navHeight: nav ? nav.offsetHeight : null,
                    heroTop: hero ? hero.getBoundingClientRect().top : null,
                    heroHeight: hero ? hero.offsetHeight : null,
                    stageTop: stage ? stage.getBoundingClientRect().top : null,
                    stageHeight: stage ? stage.offsetHeight : null,
                    eyebrowTop: eyebrow ? eyebrow.getBoundingClientRect().top : null,
                    headlineTop: headline ? headline.getBoundingClientRect().top : null,
                    rightCardTop: rightCard ? rightCard.getBoundingClientRect().top : null,
                    dockTop: dock ? dock.getBoundingClientRect().top : null,
                    dockHeight: dock ? dock.offsetHeight : null,
                    gapBetweenStageAndDock: dock && stage ? dock.getBoundingClientRect().top - (stage.getBoundingClientRect().top + stage.offsetHeight) : null
                  };
                })()`,
              },
            })
          );

          setTimeout(() => {
            ws.send(
              JSON.stringify({
                id: 2,
                method: "Page.captureScreenshot",
                params: { format: "png" },
              })
            );
          }, 500);
        }, 1500);
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 1) {
          console.log("MEASURE RESULT:", JSON.stringify(data.result.result.value, null, 2));
        } else if (data.id === 2) {
          fs.writeFileSync(
            "C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/hero_current_1366.png",
            Buffer.from(data.result.data, "base64")
          );
          console.log("Saved hero_current_1366.png");
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1200);
