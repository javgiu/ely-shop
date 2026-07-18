const KEY = "elyShopCart";

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product, selectedOptions, calculatedPrice) {
  const cart = getCart();
  const itemId = generateItemId(product, selectedOptions);
  const itemInCart = cart.find((item) => item.id === itemId);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cart.push({
      id: itemId,
      productId: product.id,
      name: product.name,
      image: product.image,
      selectedOptions: selectedOptions,
      price: calculatedPrice,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function removeFromCart(itemId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== itemId);
  saveCart(updatedCart);
  return updatedCart;
}

export function updateQuantity(itemId, newQuantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
  return cart;
}

export function clearCart() {
  localStorage.removeItem(KEY);
  return [];
}

function generateItemId(product, selectedOptions) {
  return `${product.id}-${selectedOptions.color}-${selectedOptions.closure}`;
}
