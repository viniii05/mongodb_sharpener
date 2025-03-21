const User = require("../models/User");
const Order = require("../models/Order");
const { ObjectId} = require('mongodb');
const path = require("path");
const Product = require("../models/Product");


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
        const user = await User.findUserById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.cart || !user.cart.items) {
            return res.json({ items: [] });
        }

        const cartItems = await Promise.all(user.cart.items.map(async (item) => {
            const product = await Product.findById(new ObjectId(item._id));
            return {
                _id: item._id,
                name: product ? product.title : "Unknown",
                price: product ? product.price : 0,
                quantity: item.quantity
            };
        }));

        res.json({ items: cartItems });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).json({ message: "Missing productId" });
        }

        const userData = await User.findUserById(req.user._id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = new User(userData.name, userData.email, userData.password, userData.cart, userData._id);
        
        await user.removeFromCart(productId);

        res.json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Failed to remove item from cart" });
    }
};

exports.placeOrder = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        const userData = await User.findUserById(req.user._id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = new User(userData.name, userData.email, userData.password, userData.cart, userData._id);

        if (!user.cart.items || user.cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = new Order(req.user._id, user.cart.items);
        await order.save();

        await user.clearCart();

        res.json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};