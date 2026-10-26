import { spawn } from "child_process";
import http from "http";
import fs from "fs";

const port = 9599;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1366,1100",
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
          ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `
                (() => {
                  const el = document.querySelector('.services-accordion');
                  if (!el) return 'NOT_FOUND';
                  const top = window.pageYOffset + el.getBoundingClientRect().top;
                  window.scrollTo(0, top - 120);
                  return JSON.stringify({ top, clientRect: el.getBoundingClientRect() });
                })()
              `
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: "Page.captureScreenshot",
              params: { format: "png" }
            }));
          }, 1000);
        }, 2000);
      };

      ws.onmessage = (event) => {
        const resp = JSON.parse(event.data);
        if (resp.id === 1) {
          console.log("SCROLL RESULT:", resp.result.result.value);
        } else if (resp.id === 2) {
          fs.writeFileSync("C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/services_scrolled_view.png", Buffer.from(resp.result.data, "base64"));
          console.log("Saved services_scrolled_view.png");
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
