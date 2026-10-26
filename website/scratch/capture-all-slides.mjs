import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function captureSlides() {
  const port = 9480;
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--window-size=1366,768",
    "http://localhost:3000/"
  ]);

  await new Promise(r => setTimeout(r, 2200));

  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let raw = "";
    res.on("data", c => raw += c);
    res.on("end", async () => {
      try {
        const tabs = JSON.parse(raw);
        const tab = tabs.find(t => t.url.includes("localhost:3000")) || tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        ws.onopen = async () => {
          console.log("WebSocket open, capturing each slide...");
          
          for (let i = 0; i < 5; i++) {
            // Click segment i or trigger goToSlide
            await new Promise((resolve) => {
              ws.send(JSON.stringify({
                id: 10 + i,
                method: "Runtime.evaluate",
                params: {
                  expression: `
                    (() => {
                      const buttons = document.querySelectorAll('.hero-cinematic__reel-segment');
                      if (buttons[${i}]) {
                        buttons[${i}].click();
                        return 'clicked ' + ${i};
                      }
                      return 'btn not found';
                    })()
                  `
                }
              }));
              setTimeout(resolve, 600);
            });

            // Capture screenshot
            await new Promise((resolve) => {
              const handler = (event) => {
                const resp = JSON.parse(event.data);
                if (resp.id === 100 + i) {
                  fs.writeFileSync(
                    `C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\slide_${i}.png`,
                    Buffer.from(resp.result.data, "base64")
                  );
                  console.log(`Saved slide_${i}.png`);
                  ws.removeEventListener("message", handler);
                  resolve();
                }
              };
              ws.addEventListener("message", handler);
              ws.send(JSON.stringify({
                id: 100 + i,
                method: "Page.captureScreenshot",
                params: { format: "png" }
              }));
            });
          }

          ws.close();
          chrome.kill();
        };
      } catch (e) {
        chrome.kill();
        console.error(e);
      }
    });
  }).on("error", (e) => {
    chrome.kill();
    console.error(e);
  });
}

captureSlides();

