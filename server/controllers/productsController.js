import { getAllProducts } from "../db.js";

export async function getProducts(res, options = {}) {
    try {
        console.log("Starting products");
        res.writeHead(200, { "Content-Type": "application/json" });
        const products = await getAllProducts();
        const productsJSON = JSON.stringify(products);
        res.end(productsJSON);
        return;
    } catch (error) {
        res.end("[]");
        return;
    }
}
