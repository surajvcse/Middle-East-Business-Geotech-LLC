import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function testPositions() {
  const positions = ["center 65%", "center 72%", "center 80%"];
  const port = 9520;
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
      const tabs = JSON.parse(raw);
      const tab = tabs.find(t => t.url.includes("localhost:3000")) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      ws.onopen = async () => {
        // Go to slide 3 (Al Kamil to Sur Road)
        ws.send(JSON.stringify({
          id: 1,
          method: "Runtime.evaluate",
          params: {
            expression: `document.querySelectorAll('.hero-cinematic__reel-segment')[3].click();`
          }
        }));
        await new Promise(r => setTimeout(r, 500));

        for (let i = 0; i < positions.length; i++) {
          const pos = positions[i];
          // set object position
          await new Promise((resolve) => {
            ws.send(JSON.stringify({
              id: 10 + i,
              method: "Runtime.evaluate",
              params: {
                expression: `
                  document.querySelector('.hero-cinematic__bg-slide--active .hero-cinematic__bg-image').style.objectPosition = '${pos}';
                `
              }
            }));
            setTimeout(resolve, 400);
          });

          // capture
          await new Promise((resolve) => {
            const handler = (event) => {
              const resp = JSON.parse(event.data);
              if (resp.id === 100 + i) {
                fs.writeFileSync(
                  `C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\test_pos_${i}.png`,
                  Buffer.from(resp.result.data, "base64")
                );
                console.log(`Saved test_pos_${i}.png for ${pos}`);
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
    });
  });
}

testPositions();

