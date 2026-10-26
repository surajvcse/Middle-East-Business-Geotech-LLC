import { spawn } from "child_process";
import http from "http";

const port = 9394;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--window-size=1440,900",
  "http://localhost:3000/"
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let raw = "";
    res.on("data", c => raw += c);
    res.on("end", () => {
      const tab = JSON.parse(raw)[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.onopen = () => {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `
                (() => {
                  const hero = document.querySelector('.hero-cinematic');
                  const stage = document.querySelector('.hero-cinematic__stage');
                  const content = document.querySelector('.hero-cinematic__content');
                  const dock = document.querySelector('.hero-dock');
                  const header = document.querySelector('.site-header');
                  return JSON.stringify({
                    headerHeight: header ? header.offsetHeight : null,
                    heroHeight: hero ? hero.offsetHeight : null,
                    heroPaddingTop: hero ? window.getComputedStyle(hero).paddingTop : null,
                    stageTop: stage ? stage.getBoundingClientRect().top : null,
                    stageHeight: stage ? stage.offsetHeight : null,
                    contentLeft: content ? content.getBoundingClientRect().left : null,
                    dockTop: dock ? dock.getBoundingClientRect().top : null,
                    dockHeight: dock ? dock.offsetHeight : null,
                    windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth
                  });
                })()
              `,
              returnByValue: true
            }
          }));
        }, 1500);
      };
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === 1) {
          console.log("Measurements:", msg.result?.result?.value);
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 2000);
