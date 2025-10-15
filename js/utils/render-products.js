import { products } from "../data/products.js";
import { createProductCard } from "../components/product-card.js";
import { openProductModal } from "../components/product-modal.js";

export function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");

  if (!productsGrid) return;

  const productsHTML = products
    .map((product) => createProductCard(product))
    .join("");

  productsGrid.innerHTML = productsHTML;

  const viewDetailsLinks = document.querySelectorAll(".view-details-link");

  viewDetailsLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const productId = parseInt(link.dataset.productId);
      const product = products.find((product) => product.id === productId);

      openProductModal(product);
    });
  });
}
