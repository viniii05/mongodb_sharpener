const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController");
const { isAuthenticated } = require("../middleware/auth");

router.post("/order", isAuthenticated, cartController.placeOrder);
router.get("/orders", isAuthenticated, orderController.getOrders);

module.exports = router;
