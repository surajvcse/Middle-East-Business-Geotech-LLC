import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function captureMobile() {
  const port = 9388;
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--window-size=390,844",
    "http://localhost:3000/"
  ]);

  await new Promise(r => setTimeout(r, 2200));

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
          }, 1500);
        };

        ws.onmessage = (event) => {
          const resp = JSON.parse(event.data);
          if (resp.id === 1) {
            fs.writeFileSync("C:\\Users\\trplt\\.gemini\\antigravity\\brain\\9c711dae-d9e7-4a20-ae4b-a794a9093480\\hero_agrinova_mobile.png", Buffer.from(resp.result.data, "base64"));
            console.log("Saved mobile screenshot!");
            ws.close();
            chrome.kill();
          }
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

captureMobile();

