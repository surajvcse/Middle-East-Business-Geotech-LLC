import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import os from "os";
import path from "path";

async function capture() {
  const port = 9878;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ch-footer2-"));
  // Use a tall viewport so we can see the entire footer in one screenshot cleanly
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    "--window-size=1440,1400",
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 2500));

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
        // Scroll so the footer is nicely centered in viewport
        ws.send(
          JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `
                const footer = document.querySelector('.site-footer');
                if (footer) {
                  // Get footer bounding rect and scroll just enough
                  const rect = footer.getBoundingClientRect();
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  // Scroll with 20px padding before the ribbon so the top bar doesn't obscure it
                  window.scrollTo(0, scrollTop + rect.top - 20);
                }
                true;
              `,
            },
          })
        );
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 1) {
          setTimeout(() => {
            ws.send(
              JSON.stringify({
                id: 2,
                method: "Page.captureScreenshot",
                params: {
                  format: "png",
                  captureBeyondViewport: false,
                },
              })
            );
          }, 1500);
        } else if (data.id === 2) {
          const outPath = "C:/Users/trplt/.gemini/antigravity/brain/f6be8dbe-156f-4a0f-8a21-eff36391f174/footer_premium_complete.png";
          fs.writeFileSync(outPath, Buffer.from(data.result.data, "base64"));
          console.log("Saved complete footer screenshot to:", outPath);
          ws.close();
          resolve();
        }
      };
    });
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

capture().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
