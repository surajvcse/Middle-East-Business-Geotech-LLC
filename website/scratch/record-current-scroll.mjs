import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function recordScroll() {
  const port = 9912;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-scroll-"));
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=1920,1080",
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 2200));

  try {
    const tabs = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => resolve(JSON.parse(raw)));
      }).on("error", reject);
    });

    const tab = tabs.find((t) => t.url.includes("localhost:3000")) || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(async () => {
          const scrollPositions = [0, 150, 350, 600];

          for (const pos of scrollPositions) {
            await new Promise((resP) => {
              ws.send(
                JSON.stringify({
                  id: 10,
                  method: "Runtime.evaluate",
                  params: {
                    expression: `window.scrollTo({ top: ${pos}, behavior: 'instant' });`
                  }
                })
              );

              setTimeout(() => {
                ws.send(
                  JSON.stringify({
                    id: 20,
                    method: "Page.captureScreenshot",
                    params: { format: "png" }
                  })
                );
              }, 250);

              const handler = (msg) => {
                const data = JSON.parse(msg.data);
                if (data.id === 20) {
                  fs.writeFileSync(
                    `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/current_scroll_${pos}px.png`,
                    Buffer.from(data.result.data, "base64")
                  );
                  console.log(`Saved current_scroll_${pos}px.png`);
                  ws.removeEventListener("message", handler);
                  resP();
                }
              };
              ws.addEventListener("message", handler);
            });
          }
          resolve();
        }, 1200);
      };
    });
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

recordScroll().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

