import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function compareFooterBarBlur() {
  const port = 9899;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-dock-"));
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
        setTimeout(async () => {
          const variants = [
            {
              name: "dock_blur_current_20px",
              eval: `
                const fb = document.querySelector('.hero-dock__footer-bar');
                fb.style.backdropFilter = 'blur(20px)';
                fb.style.webkitBackdropFilter = 'blur(20px)';
                fb.style.boxShadow = '0 -4px 20px rgba(0,0,0,0.4)';
                fb.style.background = 'rgba(4, 14, 26, 0.88)';
              `
            },
            {
              name: "dock_blur_moderate_8px",
              eval: `
                const fb = document.querySelector('.hero-dock__footer-bar');
                fb.style.backdropFilter = 'blur(8px)';
                fb.style.webkitBackdropFilter = 'blur(8px)';
                fb.style.boxShadow = '0 -2px 8px rgba(0,0,0,0.2)';
                fb.style.background = 'rgba(4, 14, 26, 0.72)';
              `
            },
            {
              name: "dock_blur_subtle_4px",
              eval: `
                const fb = document.querySelector('.hero-dock__footer-bar');
                fb.style.backdropFilter = 'blur(4px)';
                fb.style.webkitBackdropFilter = 'blur(4px)';
                fb.style.boxShadow = '0 -1px 4px rgba(0,0,0,0.15)';
                fb.style.background = 'rgba(4, 14, 26, 0.65)';
              `
            },
            {
              name: "dock_blur_none",
              eval: `
                const fb = document.querySelector('.hero-dock__footer-bar');
                fb.style.backdropFilter = 'none';
                fb.style.webkitBackdropFilter = 'none';
                fb.style.boxShadow = 'none';
                fb.style.background = 'rgba(4, 14, 26, 0.78)';
              `
            }
          ];

          for (const v of variants) {
            await new Promise((resV) => {
              ws.send(
                JSON.stringify({
                  id: 10,
                  method: "Runtime.evaluate",
                  params: { expression: v.eval }
                })
              );

              setTimeout(() => {
                ws.send(
                  JSON.stringify({
                    id: 20,
                    method: "Page.captureScreenshot",
                    params: {
                      format: "png",
                      clip: {
                        x: 0,
                        y: 850,
                        width: 1920,
                        height: 230,
                        scale: 1
                      }
                    }
                  })
                );
              }, 400);

              const handler = (msg) => {
                const data = JSON.parse(msg.data);
                if (data.id === 20) {
                  fs.writeFileSync(
                    `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/${v.name}_crop.png`,
                    Buffer.from(data.result.data, "base64")
                  );
                  console.log(`Saved ${v.name}_crop.png`);
                  ws.removeEventListener("message", handler);
                  resV();
                }
              };
              ws.addEventListener("message", handler);
            });
          }

          resolve();
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

compareFooterBarBlur().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
