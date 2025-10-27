import { getCartCount } from "../utils/cart.js";

let cartCountElement = null;

export function initCartCounter() {
  cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = getCartCount();
  }
}

export function updateCartCounter() {
  if (!cartCountElement) {
    cartCountElement = document.querySelector(".cart-count");
  }
  const count = getCartCount();

  if (cartCountElement) {
    cartCountElement.textContent = count;

    cartCountElement.classList.add("updated");
    setTimeout(() => {
      cartCountElement.classList.remove("updated");
    }, 300);
  }
}
