import { openCartModal } from "./cart-modal.js";

export function initCartButton() {
  const cartButton = document.querySelector(".cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      openCartModal();
    });
  }
}
