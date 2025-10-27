import { initMobileMenu } from "./components/mobile-menu.js";
import { initSmoothScroll } from "./utils/smooth-scroll.js";
import { renderProducts } from "./utils/render-products.js";
import { initProductModal } from "./components/product-modal.js";
import { initCartCounter } from "./components/cart-counter.js";
import { initCartButton } from "./components/cart-nav-button.js";
import { initCartModal } from "./components/cart-modal.js";

function init() {
  initMobileMenu();
  initSmoothScroll();
  renderProducts();
  initProductModal();
  initCartCounter();
  initCartModal();
  initCartButton();
}

document.addEventListener("DOMContentLoaded", init);
