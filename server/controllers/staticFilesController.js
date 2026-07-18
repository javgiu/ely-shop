import path from "node:path";
import fs from "node:fs/promises";

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
};

export async function staticFilesController(res, url) {
    console.log("Static files controller running");

    let filePath = path.join("./client", url);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    try {
        const data = await fs.readFile(filePath, { encoding: "utf-8" });

        res.writeHead(200, { "Content-Type": contentType });
        console.log("Resolved!");
        res.end(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.writeHead(404, { "Content-Type": "text/html" });
            console.log(filePath);
            return res.end("<h1>404 File not found</h1>");
        } else {
            console.log("Error reading file: " + filePath, err);
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end(`<h1>505 Internal Error</h1>`);
        }
    }
}
