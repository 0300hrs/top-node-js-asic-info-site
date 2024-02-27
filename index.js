const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http
  .createServer((req, res) => {
    let filePath = "." + req.url + ".html";
    if (filePath === "./.html") {
      filePath = "./index.html";
    }

    filePath = path.normalize(filePath);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          // Page not found
          fs.readFile("./404.html", (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          });
        } else {
          // Server error
          res.writeHead(500);
          res.end("Server Error: " + err.code);
        }
      } else {
        // Successful response
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(8080);
