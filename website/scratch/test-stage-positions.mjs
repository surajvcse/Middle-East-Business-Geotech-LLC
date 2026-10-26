import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function test768() {
  const port = 9700;
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--window-size=1366,768`,
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  return new Promise((resolve) => {
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
                    const hero = document.querySelector(".hero-cinematic");
                    const stage = document.querySelector(".hero-cinematic__stage");
                    hero.style.paddingTop = "0";
                    // Using clamp(3rem, 9.5vh, 7.5rem)
                    stage.style.paddingTop = "clamp(3rem, 9.5vh, 7.5rem)";
                    
                    const nav = document.querySelector(".site-header") || document.querySelector("header");
                    const dock = document.querySelector(".hero-dock");
                    return {
                      viewportH: window.innerHeight,
                      heroH: hero.offsetHeight,
                      topGap: stage.getBoundingClientRect().top - (nav ? nav.getBoundingClientRect().bottom : 0),
                      bottomGap: dock ? dock.getBoundingClientRect().top - (stage.getBoundingClientRect().top + stage.offsetHeight) : 0,
                      dockBottom: dock ? dock.getBoundingClientRect().bottom : 0
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
            }, 400);

            ws.onmessage = (msg) => {
              const data = JSON.parse(msg.data);
              if (data.id === 1) {
                console.log("Laptop 768 results with clamp(3rem, 9.5vh, 7.5rem):", data.result.result.value);
              } else if (data.id === 2) {
                fs.writeFileSync(
                  "C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/hero_laptop_768_generous.png",
                  Buffer.from(data.result.data, "base64")
                );
                console.log("Saved hero_laptop_768_generous.png");
                chrome.kill();
                resolve();
              }
            };
          }, 1500);
        };
      });
    });
  });
}

test768().then(() => process.exit(0));
