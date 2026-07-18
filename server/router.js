import { URL } from "node:url";
import { productsRouter } from "./routes/productsRoutes.js";
import { staticFilesController } from "./controllers/staticFilesController.js";
import baseController from "./controllers/homeController.js";
import errorHandler from "./controllers/errorHandler.js";

export default async function router(req, res) {
    const url = new URL(req.url, "http://127.0.0.1:3000");
    const pathname = url.pathname;
    const isFile = isStaticFile(pathname);
    console.log(url.href);

    switch (true) {
        case pathname === "/":
            baseController(res);
            break;
        case pathname === "/products":
            productsRouter(req, res, url);
            break;
        case isFile:
            staticFilesController(res, url.pathname);
            break;
        default:
            errorHandler(res, url.pathname);
            break;
    }
    return;
}

function isStaticFile(pathname) {
    const extensionsList = ["html", "css", "js", "png", "jpg", "svg", "ico"];
    const path = pathname;
    const extension = path.split(".")[1];
    if (extension) {
        const validExtension = extensionsList.some((ext) => ext === extension);
        return validExtension;
    } else {
        return false;
    }
}
