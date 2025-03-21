const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require("../middleware/auth");

router.post("/", isAuthenticated, cartController.addToCart);
router.get("/", isAuthenticated, cartController.getCart);
router.get("/data", isAuthenticated, cartController.getCartData);
router.delete("/:productId", isAuthenticated, cartController.removeFromCart);

module.exports = router;
