import { URL } from "node:url";
import path from "node:path";
import { productsRouter } from "./routes/productsRoutes.js";
import { staticFilesController } from "./controllers/staticFilesController.js";
import baseController from "./controllers/homeController.js";
import errorHandler from "./controllers/errorHandler.js";
import { usersRouter } from "./routes/usersRoutes.js";

export default async function router(req, res) {
    const url = new URL(req.url, "http://127.0.0.1:3000");
    const pathname = url.pathname;

    if (pathname === "/") {
        baseController(res);
    } else if (isStaticFile(pathname)) {
        staticFilesController(res, pathname);
    } else {
        // This will probably be a route
        const pathnames = pathname.split("/");
        const cleanPaths = pathnames.filter((path) => path !== "");
        const mainPath = cleanPaths[0];
        console.log(mainPath);

        if (mainPath === "products") {
            productsRouter(req, res, { url, cleanPaths });
        } else if (mainPath === "user") {
            usersRouter(req, res, { url, cleanPaths });
        } else {
            errorHandler(res, pathname);
        }
    }

    return;
}

function isStaticFile(pathname) {
    const extensionsList = [
        ".html",
        ".css",
        ".js",
        ".png",
        ".jpg",
        ".svg",
        ".ico",
    ];
    const extension = path.extname(pathname).toLocaleLowerCase();
    if (extension) {
        const validExtension = extensionsList.includes(extension);
        return validExtension;
    } else {
        return false;
    }
}
