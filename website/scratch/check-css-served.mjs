import http from "http";

http.get("http://127.0.0.1:3000/", (res) => {
  let html = "";
  res.on("data", c => html += c);
  res.on("end", () => {
    const regex = /href="([^"]+\.css[^"]*)"/g;
    let match;
    const links = [];
    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }
    console.log("CSS links found:", links);

    for (const link of links) {
      const fullUrl = link.startsWith("http") ? link : `http://127.0.0.1:3000${link}`;
      http.get(fullUrl, (cssRes) => {
        let css = "";
        cssRes.on("data", c => css += c);
        cssRes.on("end", () => {
          console.log(`URL ${link} -> length: ${css.length}, has floating-pill: ${css.includes("floating-pill")}, has symmetrical-deck: ${css.includes("symmetrical-deck")}`);
        });
      });
    }
  });
});

