const modal = document.getElementById("product-modal");

export function initProductModal() {
  const closeButton = modal.querySelector(".modal-close");

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

export function openProductModal(product) {
  const modalBody = modal.querySelector(".modal-body");

  console.log(product);
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
                    <span class="price-value">$${product.basePrice}</span>
                </div>

                <button class="btn btn-primary modal-add-to-cart">
                    Add to Cart
                </button>

            </div>
        </div>
    `;
  modal.showModal();
}
