import { getDisplayPrice } from "../utils/price-calculator.js";

export function createProductCard(product) {
  const price = getDisplayPrice(product);

  return `
    <article class="product-card" data-product-id="${product.id}">
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-main">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${price}</p>
        </div>
        <div class="product-actions">
            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                Add to Cart
            </button>
            <a href="#" class="btn btn-secondary view-details-link" data-product-id="${product.id}">
                View Details
            </a>
        </div>
    </article>
    `;
}
