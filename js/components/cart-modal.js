import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../utils/cart.js";
import { formatPrice } from "../utils/price-calculator.js";
import { updateCartCounter } from "./cart-counter.js";

const modal = document.getElementById("cart-modal");

export function initCartModal() {
  const closeButton = modal.querySelector(".modal-close");
  const continueShoppingButton = modal.querySelector(".cart-empty .btn");

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  if (continueShoppingButton) {
    continueShoppingButton.addEventListener("click", () => {
      modal.close();
    });
  }
}

export function openCartModal() {
  renderCartItems();
  modal.showModal();
}

function renderCartItems() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cart-items");
  const cartEmptyContainer = document.getElementById("cart-empty");
  const cartTotalElement = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartItemsContainer.classList.add("hidden");
    cartEmptyContainer.classList.add("show");
    cartTotalElement.textContent = formatPrice(0);
    return;
  }

  cartItemsContainer.classList.remove("hidden");
  cartEmptyContainer.classList.remove("show");

  // Generate cart items HTML
  cartItemsContainer.innerHTML = cart
    .map((item) => createCartItemHTML(item))
    .join("");

  // Calculate and show total price
  const total = calculateTotal(cart);
  cartTotalElement.textContent = formatPrice(total);

  // Add event listeners to the buttons
  setupCartItemListeners();
}

function createCartItemHTML(item) {
  return `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>

            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-options">
                    <span>Color: ${item.selectedOptions.color}</span>
                    <span>Closure: ${
                      item.selectedOptions.closure
                    }</span>                
                </div>
            </div>

            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-item-id="${
                  item.id
                }" aria-label="Decrease quantity"> - </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase" data-item-id="${
                  item.id
                }" aria-label="Increase quantity"> + </button>
            </div>

            <div class="cart-item-price">
                ${formatPrice(item.price * item.quantity)}
            </div>
            
            <button class="cart-item-remove" data-item-id="${
              item.id
            }" aria-label="Remove item">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

function setupCartItemListeners() {
  const increaseButtons = modal.querySelectorAll(".quantity-btn.increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.itemId;
      const cart = getCart();
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        updateQuantity(itemId, item.quantity + 1);
        renderCartItems();
        updateCartCounter();
      }
    });
  });

  const decreaseButtons = modal.querySelectorAll(".quantity-btn.decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.itemId;
      const cart = getCart();
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          updateQuantity(itemId, item.quantity - 1);
        } else {
          removeFromCart(itemId);
        }
        renderCartItems();
        updateCartCounter();
      }
    });
  });

  const removeButtons = modal.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.itemId;
      removeFromCart(itemId);
      renderCartItems();
      updateCartCounter();
    });
  });

  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the cart?")) {
        clearCart();
        renderCartItems();
        updateCartCounter();
      }
    });
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      console.log("Checkout functionality is not implemented yet.");
    });
  }
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
