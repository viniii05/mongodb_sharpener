const express = require("express");
const router = express.Router();

const cartController = require('../Controllers/cartController');
router.get("/:userId", cartController.getCartForUser);

router.post("/:userId", cartController.addProductToCart);

module.exports = router;
