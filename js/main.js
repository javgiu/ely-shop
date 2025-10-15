import { initMobileMenu } from "./components/mobile-menu.js";
import { initSmoothScroll } from "./utils/smooth-scroll.js";
import { renderProducts } from "./utils/render-products.js";
import { initProductModal } from "./components/product-modal.js";

function init() {
  initMobileMenu();
  initSmoothScroll();
  renderProducts();
  initProductModal();
}

document.addEventListener("DOMContentLoaded", init);
