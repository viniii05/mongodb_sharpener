exports.getCart = (req, res) => {
    res.send(`Fetching cart for user with ID: ${req.params.userId}`);
};

exports.postCart = (req, res) => {
    res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
};