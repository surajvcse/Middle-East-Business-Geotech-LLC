import { spawn } from "child_process";
import http from "http";
import fs from "fs";

function captureOne(url, width, height, outputFile) {
  return new Promise((resolve, reject) => {
    const port = 9420 + Math.floor(Math.random() * 50);
    const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--window-size=${width},${height}`,
      url
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let raw = "";
        res.on("data", c => raw += c);
        res.on("end", () => {
          try {
            const tabs = JSON.parse(raw);
            const tab = tabs.find(t => t.url.includes("localhost:3000")) || tabs[0];
            const ws = new WebSocket(tab.webSocketDebuggerUrl);

            ws.onopen = () => {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 1,
                  method: "Page.captureScreenshot",
                  params: { format: "png" }
                }));
              }, 1800);
            };

            ws.onmessage = (event) => {
              const resp = JSON.parse(event.data);
              if (resp.id === 1) {
                fs.writeFileSync(outputFile, Buffer.from(resp.result.data, "base64"));
                console.log(`Successfully saved ${outputFile}`);
                ws.close();
                chrome.kill();
                resolve();
              }
            };
          } catch (e) {
            chrome.kill();
            reject(e);
          }
        });
      }).on("error", (e) => {
        chrome.kill();
        reject(e);
      });
    }, 2200);
  });
}

async function runAll() {
  await new Promise(r => setTimeout(r, 2000));
  console.log("Starting verification suite...");

  await captureOne(
    "http://localhost:3000/",
    1440,
    950,
    "C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\hero_desktop_1440.png"
  );

  await captureOne(
    "http://localhost:3000/",
    1366,
    768,
    "C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\hero_laptop_1366.png"
  );

  await captureOne(
    "http://localhost:3000/",
    1280,
    800,
    "C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\hero_laptop_1280.png"
  );

  console.log("All captures complete!");
}

runAll().catch(console.error);

