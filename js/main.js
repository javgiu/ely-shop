import { initMobileMenu } from "./components/mobile-menu.js";
import { initSmoothScroll } from "./utils/smooth-scroll.js";
import { renderProducts } from "./utils/render-products.js";

function init() {
  initMobileMenu();
  initSmoothScroll();
  renderProducts();
}

document.addEventListener("DOMContentLoaded", init);
