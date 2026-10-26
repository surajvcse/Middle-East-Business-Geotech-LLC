import { spawn } from "child_process";
import http from "http";
import fs from "fs";

const port = 9620;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1366,1050",
  "http://localhost:3000/"
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let raw = "";
    res.on("data", c => raw += c);
    res.on("end", () => {
      const tabs = JSON.parse(raw);
      const tab = tabs.find(t => t.url.includes("localhost:3000")) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      ws.onopen = () => {
        setTimeout(() => {
          // Scroll accurately so the services heading and full accordion are perfectly in view
          ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `
                (() => {
                  const el = document.querySelector('.services-accordion');
                  if (!el) return 0;
                  const top = window.pageYOffset + el.getBoundingClientRect().top;
                  window.scrollTo(0, top - 180);
                  return top;
                })()
              `
            }
          }));

          // Take screenshot of default card 0
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: "Page.captureScreenshot",
              params: { format: "png" }
            }));
          }, 800);
        }, 2000);
      };

      ws.onmessage = (event) => {
        const resp = JSON.parse(event.data);
        if (resp.id === 2) {
          fs.writeFileSync("C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/services_accordion_card0.png", Buffer.from(resp.result.data, "base64"));
          console.log("Saved card0");

          // Click card 1 (Ground Anchors)
          ws.send(JSON.stringify({
            id: 3,
            method: "Runtime.evaluate",
            params: {
              expression: "document.querySelectorAll('.services-accordion__panel')[1]?.click();"
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: "Page.captureScreenshot",
              params: { format: "png" }
            }));
          }, 700);
        } else if (resp.id === 4) {
          fs.writeFileSync("C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/services_accordion_card1.png", Buffer.from(resp.result.data, "base64"));
          console.log("Saved card1");

          // Click card 4 (Ground Improvement & Grouting)
          ws.send(JSON.stringify({
            id: 5,
            method: "Runtime.evaluate",
            params: {
              expression: "document.querySelectorAll('.services-accordion__panel')[4]?.click();"
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 6,
              method: "Page.captureScreenshot",
              params: { format: "png" }
            }));
          }, 700);
        } else if (resp.id === 6) {
          fs.writeFileSync("C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/services_accordion_card4.png", Buffer.from(resp.result.data, "base64"));
          console.log("Saved card4");
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  }).on("error", (e) => {
    chrome.kill();
    process.exit(1);
  });
}, 2000);

