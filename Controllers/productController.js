const path = require('path');
exports.getAllProducts = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/productForm.html"));
};

exports.addProduct = (req, res) => {
    res.send("Adding a new product");
};

exports.getProductById = (req, res) => {
    res.send(`Fetching product with ID: ${req.params.id}`);
};