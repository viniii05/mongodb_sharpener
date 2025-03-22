const Order = require("../models/Order");
const User = require("../models/User");

exports.placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = await user.placeOrder();
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ "user.userId": req.user._id });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
