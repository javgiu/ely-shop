import { createServer } from "node:http";
import * as db from "./db.js";
import router from "./router.js";

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

// Init database

try {
    await db.initDatabaseTest();
    console.log("Database ready");
} catch (error) {
    console.log("Failed to initialize database: ", error);
}

const server = createServer(router);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Fix path traversal attacks exposition
// Investigate import.meta.url
