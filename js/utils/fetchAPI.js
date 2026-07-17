export async function requestProducts() {
    try {
        const response = await fetch("/products");
        const products = await response.json();
        return products;
    } catch (error) {
        console.log("Failed to get response of products from server: ", error);
    }
}
