const User = require("../models/User");
const { ObjectId} = require('mongodb');
const path = require("path");

exports.addToCart = async (req, res) => {
    try {
        console.log("User ID received:", req.user._id);

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        const productId = req.body.productId;
        if (!productId) {
            return res.status(400).json({ message: "Missing productId" });
        }

        const userData = await User.findUserById(req.user._id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = new User(userData.name, userData.email, userData.password, userData.cart, userData._id);

        await user.addToCart({ _id: new ObjectId(productId) });

        res.json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Failed to add product to cart" });
    }
};

exports.getCart = async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/cart.html"));
};
exports.getCartData = async (req, res) => {
    try {
        console.log("User ID in request:", req.user ? req.user._id : "No user");

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        const user = await User.findUserById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.cart || { items: [] });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        const user = await User.findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.removeFromCart(productId);
        res.json({ message: "Product removed from cart" });

    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Failed to remove item from cart" });
    }
};
