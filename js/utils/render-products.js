import { products } from "../data/products.js";
import { createProductCard } from "../components/product-card.js";

export function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");

  if (!productsGrid) return;

  const productsHTML = products
    .map((product) => createProductCard(product))
    .join("");

  productsGrid.innerHTML = productsHTML;
}
