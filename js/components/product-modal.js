import { calculatePrice, formatPrice } from "../utils/price-calculator.js";
import { addToCart, getCartCount } from "../utils/cart.js";
import { updateCartCounter } from "./cart-counter.js";
import { showSuccessToast } from "./toast.js";
import { openModal, closeModal } from "../utils/modal-system.js";

const modal = document.getElementById("product-modal");

export function openProductModal(product) {
  const modalBody = modal.querySelector(".modal-body");

  const initialPrice = calculatePrice(product, product.defaultOptions);

  modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>

            <div class="modal-product-info">
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-description">${product.description}</p>

                <div class="product-option">
                    <span class="option-label">Color:</span>
                    <div class="color-options">
                        ${product.options.colors
                          .map(
                            (color) => `
                            <button class="color-btn ${
                              product.defaultOptions.color === color.value
                                ? "active"
                                : ""
                            }"
                                data-color="${color.value}"
                                style="background-color: ${color.hex}"
                                aria-label="${color.label}"
                                title="${color.label}">
                            </button>
                            `
                          )
                          .join("")}
                    </div>
                </div>

                <div class="product-option">
                    <label class="option-label">Closure:</label>
                    <select class="closure-select">
                        ${product.options.closures
                          .map(
                            (closure) =>
                              `
                            <option value="${closure.value}" ${
                                product.defaultOptions.closure === closure.value
                                  ? "selected"
                                  : ""
                              }>${closure.label}</option>
                            `
                          )
                          .join("")}
                    </select>
                </div>

                <div class="modal-product-price">
                    <span class="price-label">Price:</span>
                    <span class="price-value">${formatPrice(
                      initialPrice
                    )}</span>
                </div>

                <button class="btn btn-primary modal-add-to-cart">
                    Add to Cart
                </button>

            </div>
        </div>
    `;

  setupListeners(product);

  openModal(modal.id);
}

function setupListeners(product) {
  const colorButtons = modal.querySelectorAll(".color-btn");
  const closureSelect = modal.querySelector(".closure-select");
  const priceValueElement = modal.querySelector(".price-value");
  const addToCartButton = modal.querySelector(".modal-add-to-cart");

  let selectedOptions = {
    color: product.defaultOptions.color,
    closure: product.defaultOptions.closure,
  };

  function updatePrice() {
    const newPrice = calculatePrice(product, selectedOptions);
    priceValueElement.textContent = formatPrice(newPrice);
  }

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      colorButtons.forEach((button) => button.classList.remove("active"));

      button.classList.add("active");

      selectedOptions.color = button.dataset.color;

      updatePrice();
    });
  });

  closureSelect.addEventListener("change", (event) => {
    selectedOptions.closure = event.target.value;
    updatePrice();
  });

  addToCartButton.addEventListener("click", () => {
    const finalPrice = calculatePrice(product, selectedOptions);

    addToCart(product, selectedOptions, finalPrice);

    closeModal(modal.id);

    updateCartCounter();

    showSuccessToast(
      `${product.name} (${selectedOptions.color}) added to cart`
    );
  });
}
