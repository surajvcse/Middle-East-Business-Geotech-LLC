import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function testShifts() {
  const port = 9922;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-shift-more-"));
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
              name: "more_down_18vh",
              pt: "clamp(5.75rem, 18vh, 13rem)"
            },
            {
              name: "more_down_20vh",
              pt: "clamp(6rem, 20vh, 14.5rem)"
            },
            {
              name: "more_down_22vh",
              pt: "clamp(6.25rem, 22vh, 16rem)"
            }
          ];

          for (const v of variants) {
            await new Promise((resV) => {
              ws.send(
                JSON.stringify({
                  id: 10,
                  method: "Runtime.evaluate",
                  params: {
                    expression: `
                      (() => {
                        const stage = document.querySelector('.hero-cinematic__stage');
                        if (stage) stage.style.paddingTop = '${v.pt}';
                      })()
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
                    `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/${v.name}.png`,
                    Buffer.from(data.result.data, "base64")
                  );
                  console.log(`Saved ${v.name}.png`);
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

testShifts().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

