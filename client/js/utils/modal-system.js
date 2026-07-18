const openModals = new Set();
let lastFocusedElement = null;

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`Modal with id: ${modalId} not found`);
    return;
  }

  lastFocusedElement = document.activeElement;

  openModals.add(modalId);

  // Show modal
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  // Block body scroll
  document.body.classList.add("modal-open");

  // Focus first focusable element
  focusFirstElement(modal);

  // Setup event listeners
  setupModalListeners(modal);
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  // Remove from open modals list
  openModals.delete(modalId);

  // Hide modal
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  // If there's no open modal, unblock body scroll
  if (openModals.size === 0) {
    document.body.classList.remove("modal-open");

    //Restore last focused element
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  cleanupModalListeners(modal);
}

function setupModalListeners(modal) {
  const overlay = modal.querySelector(".modal-overlay");
  const closeButtons = modal.querySelectorAll("[data-modal-close]");

  const overlayClickHandler = () => closeModal(modal.id);
  const closeButtonClickHandler = () => closeModal(modal.id);
  // Close with ESC
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeModal(modal.id);
    }
  };

  if (overlay) {
    overlay.addEventListener("click", overlayClickHandler);
    modal._overlayClickHandler = overlayClickHandler;
  }

  if (closeButtons) {
    closeButtons.forEach((button) =>
      button.addEventListener("click", closeButtonClickHandler)
    );
    modal._closeButtonClickHandler = closeButtonClickHandler;
    modal._closeButtons = closeButtons;
  }

  document.addEventListener("keydown", escHandler);
  modal._escHandler = escHandler;

  setupFocusTrap(modal);
}

function cleanupModalListeners(modal) {
  console.dir(modal);
  const overlay = modal.querySelector(".modal-overlay");

  if (overlay && modal._overlayClickHandler) {
    overlay.removeEventListener("click", modal._overlayClickHandler);
    delete modal._overlayClickHandler;
  }

  if (modal._closeButtons && modal._closeButtonClickHandler) {
    modal._closeButtons.forEach((button) =>
      button.removeEventListener("click", modal._closeButtonClickHandler)
    );
    delete modal._closeButtonClickHandler;
    delete modal._closeButtons;
  }

  if (modal._escHandler) {
    document.removeEventListener("keydown", modal._escHandler);
    delete modal._escHandler;
  }

  if (modal._trapHandler) {
    modal.removeEventListener("keydown", modal._trapHandler);
    delete modal._trapHandler;
  }
}

function focusFirstElement(modal) {
  const focusableElements = getFocusableElements(modal);

  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

function setupFocusTrap(modal) {
  const focusableElements = getFocusableElements(modal);

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusFirstElement[focusableElements.length - 1];

  const trapHandler = (e) => {
    if (e.key !== "Tab") return;

    if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  };

  modal.addEventListener("keydown", trapHandler);
  modal._trapHandler = trapHandler;
}

function getFocusableElements(container) {
  const selector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)).filter((el) => {
    // 1. No debe estar disabled
    if (el.disabled) return false;

    // 2. Debe ser visible (offsetParent !== null O position: fixed)
    if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") {
      return false;
    }

    // 3. No debe tener display: none o visibility: hidden
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }

    return true;
  });
}

export function IsModalOpen(modalId) {
  return openModals.has(modalId);
}

export function closeAllModals() {
  openModals.forEach((modalId) => closeModal(modalId));
}
