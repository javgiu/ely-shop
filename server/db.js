import fs from "node:fs/promises";
import path from "node:path";

class Product {
    constructor(name, price) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.price = price;
    }
}

const productsTest = [
    {
        id: 1,
        name: "Luna Crescent Earrings",
        basePrice: 25,
        category: "polymer-clay",
        description:
            "Elegant crescent moon shaped earrings with metallic finish. Perfect for evening wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "studs", label: "Stud Posts", priceModifier: 0 },
                { value: "hooks", label: "Fish Hooks", priceModifier: 1 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "studs",
        },

        material: "polymer-clay",

        dimensions: {
            length: "2cm",
            weight: "light",
        },

        inStock: true,
        featured: true,
    },

    {
        id: 2,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: true,
    },
    {
        id: 3,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: false,
    },
    {
        id: 4,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: false,
    },
    {
        id: 5,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: false,
    },
    {
        id: 6,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: false,
    },
    {
        id: 7,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: false,
    },
    {
        id: 8,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: true,
        featured: true,
    },
    {
        id: 9,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: false,
        featured: false,
    },
    {
        id: 10,
        name: "Floral Drop Earrings",
        basePrice: 30,
        category: "cold-porcelain",
        description:
            "Delicate handcrafted flower design. Lightweight and comfortable for all-day wear.",
        image: "https://via.placeholder.com/400x400/FAF8F3/D4AF37?text=Floral+Earrings",

        options: {
            colors: [
                {
                    value: "gold",
                    label: "Gold",
                    priceModifier: 0,
                    hex: "#d4af37",
                },
                {
                    value: "silver",
                    label: "Silver",
                    priceModifier: 0,
                    hex: "#c0c0c0",
                },
                {
                    value: "rose-gold",
                    label: "Rose-gold",
                    priceModifier: 1,
                    hex: "#b76e79",
                },
            ],
            closures: [
                { value: "hooks", label: "Fish Hooks", priceModifier: 0 },
                { value: "clip-on", label: "Clip-On", priceModifier: 3 },
            ],
        },

        defaultOptions: {
            color: "gold",
            closure: "hooks",
        },

        material: "cold-porcelain",

        dimensions: {
            length: "3cm",
            weight: "light",
        },

        inStock: false,
        featured: false,
    },
];

const productsPath = path.resolve("./server/database/products.json");

export async function getAllProducts() {
    const data = await fs.readFile(productsPath, {
        encoding: "utf-8",
    });
    const products = JSON.parse(data);
    if (products.length === 0) {
        console.log("No products in database");
    }
    return products;
}

export async function initDatabaseTest() {
    try {
        console.log("Writing products file for test...");
        await fs.writeFile(productsPath, JSON.stringify(productsTest));
    } catch (error) {
        console.log(
            "Failed to write the database with the test products: ",
            error,
        );
    }
}

// Separate logic of testing and initializing db
