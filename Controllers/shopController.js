const path = require('path');
const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    if (req.headers.accept.includes("text/html")) {
        return res.sendFile(path.join(__dirname, "../views/shop.html"));
    }

    try {
        const products = await Product.fetchAll();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findById(prodId);
        
        if (!product) {
            return res.status(404).sendFile(path.join(__dirname, "../views/404.html"));
        }

        if (req.headers.accept && req.headers.accept.includes("application/json")) {
            return res.json(product);
        }

        res.sendFile(path.join(__dirname, "../views/product-detail.html"));
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Server Error");
    }
};

