import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function capture() {
  const port = 9876;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-"));
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
              method: "Page.captureScreenshot",
              params: { format: "png" },
            })
          );

          ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.id === 1) {
              fs.writeFileSync(
                "C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/hero_dock_current.png",
                Buffer.from(data.result.data, "base64")
              );
              console.log("Saved hero_dock_current.png successfully");
              ws.close();
              resolve();
            }
          };
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

capture().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
