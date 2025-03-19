const path = require("path");
const Product = require("../models/product");

// Controller to handle adding a product
exports.postAddProduct = async (req, res) => {
    try {
        const { title, price, description, imageUrl } = req.body;

        if (!title || !price || !description || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = new Product(title, price, description, imageUrl);
        await product.save();

        console.log("Product added!");
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Controller to serve the add-product page
exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addProduct.html")); // Ensure path is correct
};