// Minimal static file server for the Budget 2027 dashboard (no dependencies).
// Usage: node server.js [port]   (default 8080, or the PORT env variable)
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8080);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".md": "text/plain; charset=utf-8"
};

const server = http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname); }
  catch { res.writeHead(400); return res.end("Bad request"); }
  if (urlPath.endsWith("/")) urlPath += "index.html";
  const file = path.normalize(path.join(ROOT, urlPath));
  // Stay inside the project folder and never serve git internals or the server itself
  if (!file.startsWith(ROOT + path.sep) || file.includes(`${path.sep}.git`) || file === __filename) {
    res.writeHead(403); return res.end("Forbidden");
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
});

// If the port is taken, try the next one (up to 10 attempts) instead of crashing
let port = PORT;
server.on("error", (err) => {
  if (err.code === "EADDRINUSE" && port < PORT + 10) {
    console.log(`Port ${port} is busy, trying ${port + 1}…`);
    port += 1;
    server.listen(port);
  } else {
    console.error(err.message);
    process.exit(1);
  }
});
server.on("listening", () => {
  console.log(`Budget 2027 dashboard running at http://localhost:${port}`);
  console.log(`  Sinhala: http://localhost:${port}/?lang=si   Tamil: http://localhost:${port}/?lang=ta`);
  console.log("Press Ctrl+C to stop.");
});
server.listen(port);
