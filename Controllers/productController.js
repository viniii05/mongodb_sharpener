exports.getProduct = (req, res) => {
    res.send("Fetching all products");
};

exports.postProduct = (req, res) => {
    res.send("Adding a new product");
};

exports.getProductById = (req, res) => {
    res.send(`Fetching product with ID: ${req.params.id}`);
};