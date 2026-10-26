import { spawn } from "child_process";
import http from "http";

const port = 9655;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1366,1050",
  "http://localhost:3000/"
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let raw = "";
    res.on("data", c => raw += c);
    res.on("end", () => {
      const tabs = JSON.parse(raw);
      const tab = tabs.find(t => t.url.includes("localhost:3000")) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      ws.onopen = () => {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `
                (() => {
                  const p1 = document.querySelectorAll('.services-accordion__panel')[1];
                  const c1 = p1?.querySelector('.services-accordion__content');
                  const cs = c1 ? window.getComputedStyle(c1) : null;
                  return JSON.stringify({
                    class: c1?.className,
                    opacity: cs?.opacity,
                    visibility: cs?.visibility,
                    display: cs?.display,
                    position: cs?.position
                  });
                })()
              `
            }
          }));
        }, 1500);
      };

      ws.onmessage = (event) => {
        const resp = JSON.parse(event.data);
        if (resp.id === 1) {
          console.log("CONTENT 1 STATUS:", resp.result.result.value);
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  }).on("error", (e) => {
    chrome.kill();
    process.exit(1);
  });
}, 2000);
