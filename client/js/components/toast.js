let toastContainer = null;

function getContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      console.error("Toast container not found in DOM");
    }
  }
  return toastContainer;
}

export function showToast(message, type = "info", duration = 3000) {
  toastContainer = getContainer();
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    succes: "fa-check-circle",
    error: "fa-times-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
  };

  toast.innerHTML = `
    <div class="toast-content">
        <i class="fas ${icons[type]} toast-icon"></i>
        <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
    </button>
  `;
  toastContainer.appendChild(toast);

  const closeButton = toast.querySelector(".toast-close");
  closeButton.addEventListener("click", () => {
    removeToast(toast);
  });

  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast) {
  toast.classList.add("hiding");

  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 300);
}

export function showErrorToast(message) {
  showToast(message, "error");
}
export function showSuccessToast(message) {
  showToast(message, "success");
}
export function showWarningToast(message) {
  showToast(message, "warning");
}
export function showInfoToast(message) {
  showToast(message, "info");
}
