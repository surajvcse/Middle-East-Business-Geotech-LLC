import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function testScreens() {
  const configs = [
    { pt: "clamp(5.25rem, 18.5vh, 13rem)", label: "18.5vh" },
    { pt: "clamp(5.25rem, 19.5vh, 13.5rem)", label: "19.5vh" }
  ];

  for (const cfg of configs) {
    for (const size of [{ w: 1920, h: 1080, name: "desktop" }, { w: 1366, h: 768, name: "laptop" }]) {
      const port = 9911;
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-v-"));
      const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
        "--headless=new",
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${tmpDir}`,
        `--window-size=${size.w},${size.h}`,
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
                  id: 10,
                  method: "Runtime.evaluate",
                  params: {
                    expression: `
                      const stage = document.querySelector('.hero-cinematic__stage');
                      if (stage) stage.style.paddingTop = '${cfg.pt}';
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
                  const outName = `down_${cfg.label}_${size.name}.png`;
                  fs.writeFileSync(
                    `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/${outName}`,
                    Buffer.from(data.result.data, "base64")
                  );
                  console.log(`Saved ${outName}`);
                  ws.removeEventListener("message", handler);
                  resolve();
                }
              };
              ws.addEventListener("message", handler);
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
  }
}

testScreens().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

