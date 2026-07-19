import { getProducts } from "../controllers/productsController.js";

export function productsRouter(req, res, { url, cleanPaths }) {
    if (req.method === "GET") {
        getProducts(res);
    }
}
