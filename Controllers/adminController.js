const path = require("path");
const Product = require('../models/product');

exports.getAddProductPage = (req,res) => {
    res.sendFile(path.join(__dirname, "../views/add-product.html"));
}
exports.postAddProduct = async (req, res) => {
    try {
        const { title, price, description, imageUrl } = req.body;
        if (!title || !price || !description || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = new Product(title, price, description, imageUrl);
        await product.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

exports.getAdminProduct = async (req, res) => {
    try {
        const products = await Product.fetchAll();

        if (req.headers.accept && req.headers.accept.includes("application/json")) {
            return res.json(products);
        }

        res.sendFile(path.join(__dirname, "../views/admin-product.html"));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Server Error");
    }
};

exports.getEditProductPage = async (req, res) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findById(prodId);

        if (!product) {
            return res.status(404).sendFile(path.join(__dirname, "../views/404.html"));
        }

        if (req.headers.accept && req.headers.accept.includes("application/json")) {
            return res.json(product);
        }

        res.sendFile(path.join(__dirname, "../views/edit-product.html"));
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.postEditProduct = async (req, res) => {
    try {
        const { productId, title, price, description, imageUrl } = req.body;
        const updatedProduct = new Product(title, price, description, imageUrl, productId);
        await updatedProduct.save();
        res.redirect("/admin/admin-product");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.postDeleteProduct = async (req, res) => {
    try {
        const prodId = req.body.productId;
        if (!prodId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        await Product.deleteById(prodId);
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
