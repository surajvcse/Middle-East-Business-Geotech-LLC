import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function captureScrollAnimation() {
  const port = 9931;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-scroll3d-"));
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=1920,1080",
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 2400));

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
          const frames = [
            { pos: 0, label: "01_top_view_0px" },
            { pos: 150, label: "02_receding_150px" },
            { pos: 300, label: "03_perspective_tilt_300px" },
            { pos: 480, label: "04_elevated_deck_reveal_480px" },
            { pos: 650, label: "05_docked_editorial_650px" }
          ];

          for (const f of frames) {
            await new Promise((resF) => {
              ws.send(
                JSON.stringify({
                  id: 10,
                  method: "Runtime.evaluate",
                  params: {
                    expression: `
                      window.scrollTo({ top: ${f.pos}, behavior: 'instant' });
                      window.dispatchEvent(new Event('scroll'));
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
                  const outPath = `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/anim_3d_${f.label}.png`;
                  fs.writeFileSync(outPath, Buffer.from(data.result.data, "base64"));
                  console.log(`Saved ${outPath}`);
                  ws.removeEventListener("message", handler);
                  resF();
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

captureScrollAnimation().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

