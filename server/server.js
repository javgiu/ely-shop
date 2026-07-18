import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import * as db from "./db.js";

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

// Init database

try {
    db.initDatabaseTest();
} catch (error) {
    console.log("Failed to initialize database: ", error);
}

const server = createServer(handleRequests);

async function handleRequests(req, res) {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    console.log("Requested URL: ", urlPath);

    if (urlPath === "/favicon.ico") return;

    if (urlPath === "/products") {
        try {
            console.log("Starting products");
            res.writeHead(200, { "Content-Type": "application/json" });
            const productsJSON = await db.getAllProducts();
            res.end(productsJSON);
            return;
        } catch (error) {
            res.end("[]");
            return;
        }
    }

    let filePath = path.join("./client", urlPath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
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
        res.writeHead(200, { "Content-Type": contentType });
        console.log("Resolved!");
        res.end(data);
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
