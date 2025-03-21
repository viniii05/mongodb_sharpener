const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }

        const orders = await Order.findOrdersByUserId(req.user._id);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
