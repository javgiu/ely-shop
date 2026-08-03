export async function requestProducts() {
    try {
        const response = await fetch("/products");
        const products = await response.json();
        return products;
    } catch (error) {
        console.log("Failed to get response of products from server: ", error);
    }
}

export async function requestUserCredentials(userCredentials) {
    try {
        const response = await fetch("/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
        });
        if (response.status === 401) {
            return null;
        }

        if (!response.ok) throw new Error("Server Error");

        const userData = await response.json();

        return userData;
    } catch (error) {
        console.log("Failed to get response for user credentials", error);
    }
}
