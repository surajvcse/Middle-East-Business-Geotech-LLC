import { spawn } from "child_process";
import http from "http";
import fs from "fs";

const port = 9560;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1366,768",
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
            params: { expression: "document.querySelectorAll('.hero-cinematic__reel-segment')[1]?.click();" }
          }));
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: "Page.captureScreenshot",
              params: { format: "png" }
            }));
          }, 1200);
        }, 1500);
      };

      ws.onmessage = (event) => {
        const resp = JSON.parse(event.data);
        if (resp.id === 2) {
          fs.writeFileSync("C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/hero_slide_khasab_noborder.png", Buffer.from(resp.result.data, "base64"));
          console.log("Saved khasab slide without border successfully!");
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

