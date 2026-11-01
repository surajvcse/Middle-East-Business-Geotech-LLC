import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function run() {
  const port = 9901;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-cap-verify-"));
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=390,844",
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 3500));

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

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = Math.floor(Math.random() * 1000000);
        const timeout = setTimeout(() => {
          ws.removeEventListener("message", handler);
          reject(new Error(`Timeout waiting for CDP method ${method}`));
        }, 8000);

        const handler = (msg) => {
          try {
            const data = JSON.parse(msg.data);
            if (data.id === id) {
              clearTimeout(timeout);
              ws.removeEventListener("message", handler);
              if (data.error) reject(new Error(JSON.stringify(data.error)));
              else resolve(data.result);
            }
          } catch {}
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });

    await new Promise((res) => { ws.onopen = res; });

    // Mobile 390x844
    console.log("Setting mobile metrics...");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send("Page.reload");
    await new Promise((res) => setTimeout(res, 2500));

    const shotMob = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      "C:/Users/trplt/.gemini/antigravity/brain/f6be8dbe-156f-4a0f-8a21-eff36391f174/verify_mob_cue_elevated.png",
      Buffer.from(shotMob.data, "base64")
    );
    console.log("Saved verify_mob_cue_elevated.png");

    ws.close();
  } finally {
    chrome.kill();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

run().then(() => process.exit(0)).catch((e) => {
  console.error("Run error:", e);
  process.exit(1);
});
