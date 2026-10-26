import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function compareShifts() {
  const port = 9690;
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--window-size=1600,900`,
    "http://localhost:3000/"
  ]);

  await new Promise((r) => setTimeout(r, 1200));

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
              { name: "shift_current", pt: "clamp(2.5rem, 5vh, 3.5rem)", stagePt: "clamp(0.75rem, 1.8vh, 1.5rem)" },
              { name: "shift_moderate", pt: "0", stagePt: "clamp(4rem, 9.5vh, 7rem)" },
              { name: "shift_generous", pt: "0", stagePt: "clamp(4.75rem, 12vh, 8.5rem)" },
            ];

            for (const opt of options) {
              await new Promise((resOpt) => {
                ws.send(
                  JSON.stringify({
                    id: 1,
                    method: "Runtime.evaluate",
                    params: {
                      expression: `
                        const hero = document.querySelector(".hero-cinematic");
                        const stage = document.querySelector(".hero-cinematic__stage");
                        hero.style.paddingTop = "${opt.pt}";
                        stage.style.paddingTop = "${opt.stagePt}";
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

compareShifts().then(() => process.exit(0));
