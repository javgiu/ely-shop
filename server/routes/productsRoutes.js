import { getProducts } from "../controllers/productsController.js";

export function productsRouter(req, res, url) {
    if (req.method === "GET") {
        getProducts(res);
    }
}
