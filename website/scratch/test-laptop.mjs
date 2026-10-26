import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function testLaptop() {
  const port = 9922;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-laptop-"));
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=1366,768",
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
        setTimeout(async () => {
          ws.send(
            JSON.stringify({
              id: 10,
              method: "Runtime.evaluate",
              params: {
                expression: `
                  const stage = document.querySelector('.hero-cinematic__stage');
                  if (stage) {
                    stage.style.width = 'min(100% - 2.5rem, 78rem)';
                    stage.style.maxWidth = '78rem';
                    stage.style.marginInline = 'auto';
                    stage.style.paddingInline = '0';
                    stage.style.paddingTop = 'clamp(4rem, 9.5vh, 6.5rem)';
                  }
                  const grid = document.querySelector('.hero-cinematic__grid');
                  if (grid) {
                    grid.style.gridTemplateColumns = 'minmax(0, 1.35fr) minmax(18rem, 23rem)';
                    grid.style.gap = '2rem';
                  }
                  const fb = document.querySelector('.hero-dock__footer-bar');
                  if (fb) {
                    fb.style.backdropFilter = 'blur(8px)';
                    fb.style.webkitBackdropFilter = 'blur(8px)';
                    fb.style.boxShadow = '0 -2px 8px rgba(0,0,0,0.18)';
                    fb.style.background = 'rgba(4, 14, 26, 0.76)';
                  }
                `
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
          }, 400);

          const handler = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.id === 20) {
              fs.writeFileSync(
                "C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/hero_closer_laptop_768p.png",
                Buffer.from(data.result.data, "base64")
              );
              console.log("Saved hero_closer_laptop_768p.png");
              ws.removeEventListener("message", handler);
              resolve();
            }
          };
          ws.addEventListener("message", handler);
        }, 1500);
      };
    });
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

testLaptop().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

