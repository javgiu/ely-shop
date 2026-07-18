import { initMobileMenu } from "./components/mobile-menu.js";
import { initSmoothScroll } from "./utils/smooth-scroll.js";
import { renderProducts } from "./utils/render-products.js";
import { initCartCounter } from "./components/cart-counter.js";
import { initCartButton } from "./components/cart-nav-button.js";

function init() {
  initMobileMenu();
  initSmoothScroll();
  renderProducts();
  initCartCounter();
  initCartButton();
}

document.addEventListener("DOMContentLoaded", init);
