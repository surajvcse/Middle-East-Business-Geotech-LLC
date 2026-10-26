import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function runTest(width, height, suffix, port) {
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let raw = "";
      res.on("data", (c) => (raw += c));
      res.on("end", () => {
        const tabs = JSON.parse(raw);
        const tab = tabs.find((t) => t.url.includes("localhost:3000")) || tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        ws.onopen = () => {
          setTimeout(async () => {
            const options = [
              { name: `shift_opt1_current_${suffix}`, stagePt: "clamp(4.5rem, 11vh, 8rem)" },
              { name: `shift_opt2_moderate_${suffix}`, stagePt: "clamp(5.5rem, 14vh, 9.5rem)" },
              { name: `shift_opt3_deep_${suffix}`, stagePt: "clamp(6.5rem, 16.5vh, 11rem)" },
            ];

            for (const opt of options) {
              await new Promise((resOpt) => {
                ws.send(
                  JSON.stringify({
                    id: 1,
                    method: "Runtime.evaluate",
                    params: {
                      expression: `
                        const stage = document.querySelector(".hero-cinematic__stage");
                        if (stage) stage.style.paddingTop = "${opt.stagePt}";
                      `,
                    },
                  })
                );

                setTimeout(() => {
                  ws.send(
                    JSON.stringify({
                      id: 2,
                      method: "Page.captureScreenshot",
                      params: { format: "png" },
                    })
                  );
                }, 400);

                const handler = (msg) => {
                  const data = JSON.parse(msg.data);
                  if (data.id === 2) {
                    fs.writeFileSync(
                      `C:/Users/trplt/.gemini/antigravity/brain/9c711dae-d9e7-4a20-ae4b-a794a9093480/${opt.name}.png`,
                      Buffer.from(data.result.data, "base64")
                    );
                    console.log(`Saved ${opt.name}.png`);
                    ws.removeEventListener("message", handler);
                    resOpt();
                  }
                };
                ws.addEventListener("message", handler);
              });
            }

            chrome.kill();
            resolve();
          }, 1500);
        };
      });
    });
  });
}

async function main() {
  await runTest(1920, 1080, "1080p");
  await new Promise((r) => setTimeout(r, 1000));
  await runTest(1366, 768, "768p");
  console.log("All done!");
}

main().then(() => process.exit(0));
