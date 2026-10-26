import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function capture(w, h, filename) {
  const port = 9710;
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--window-size=${w},${h}`,
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
                method: "Page.captureScreenshot",
                params: { format: "png" },
              })
            );

            ws.onmessage = (msg) => {
              const data = JSON.parse(msg.data);
              if (data.id === 1) {
                fs.writeFileSync(
                  `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/${filename}`,
                  Buffer.from(data.result.data, "base64")
                );
                console.log(`Saved ${filename}`);
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

async function run() {
  await capture(1920, 1080, "hero_shifted_1080p.png");
  await capture(1440, 900, "hero_shifted_1440p.png");
  await capture(1366, 768, "hero_shifted_1366p.png");
}

run().then(() => process.exit(0));
