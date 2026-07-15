import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { error } from "node:console";

const hostname = "127.0.0.1";
const port = 3000;

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
};

const server = createServer((req, res) => {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    console.log("URL: ", urlPath);

    let filePath = path.join(".", urlPath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            if (error.code === "ENDENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("<h1>404 File not found</h1>");
            } else {
                console.log("Error reading file: " + filePath, err);
                res.writeHead(500, { "Content-Type": "text/html" });
                return res.end(`<h1>505 Internal Error</h1>`);
            }
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
