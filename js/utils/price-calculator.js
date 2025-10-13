export function calculatePrice(product, selectedOptions) {
  let finalPrice = product.basePrice;

  const selectedColor = product.options.color.find(
    (color) => color.value === selectedOptions.color
  );
  if (selectedColor) {
    finalPrice += selectedColor.priceModifier;
  }

  const selectedClosure = product.options.closure.find(
    (closure) => closure.value === selectedOptions.closure
  );
  if (selectedClosure) {
    finalPrice += selectedClosure.priceModifier;
  }

  return finalPrice;
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function getDisplayPrice(product) {
  const price = calculatePrice(product, product.defaultOptions);
  return formatPrice(price);
}
