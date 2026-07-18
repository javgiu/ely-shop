// import { products } from "../data/products.js";
import { requestProducts } from "./fetchAPI.js";
import { createProductCard } from "../components/product-card.js";
import { openProductModal } from "../components/product-modal.js";

export async function renderProducts() {
    try {
        const productsGrid = document.querySelector(".products-grid");

        if (!productsGrid) return;

        let data = await requestProducts();
        const products = JSON.parse(data);

        const productsHTML = products
            .map((product) => createProductCard(product))
            .join("");

        productsGrid.innerHTML = productsHTML;

        const viewDetailsLinks =
            document.querySelectorAll(".view-details-link");

        viewDetailsLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                const productId = parseInt(link.dataset.productId);
                const product = products.find(
                    (product) => product.id === productId,
                );

                openProductModal(product);
            });
        });
    } catch (error) {
        console.log(error);
    }
}
