import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function measure() {
  const port = 9933;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-m-"));
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=1920,1080",
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 2000));

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
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              id: 1,
              method: "Runtime.evaluate",
              params: {
                returnByValue: true,
                expression: `(() => {
                  const stage = document.querySelector('.hero-cinematic__stage');
                  const content = document.querySelector('.hero-cinematic__content');
                  const hud = document.querySelector('.hero-cinematic__hud');
                  const dock = document.querySelector('.hero-dock');
                  const stageRect = stage?.getBoundingClientRect();
                  const contentRect = content?.getBoundingClientRect();
                  const hudRect = hud?.getBoundingClientRect();
                  const dockRect = dock?.getBoundingClientRect();
                  return {
                    stageTop: stageRect?.top,
                    stageBottom: stageRect?.bottom,
                    contentTop: contentRect?.top,
                    contentBottom: contentRect?.bottom,
                    hudTop: hudRect?.top,
                    hudBottom: hudRect?.bottom,
                    dockTop: dockRect?.top,
                    gapToDock: dockRect ? (dockRect.top - Math.max(contentRect.bottom, hudRect.bottom)) : null
                  };
                })()`
              }
            })
          );

          ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.id === 1) {
              console.log("Measurements at 1920x1080:", JSON.stringify(data.result.value, null, 2));
              resolve();
            }
          };
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

measure().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

