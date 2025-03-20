const express = require("express");
const router = express.Router();

const productController = require('../Controllers/productController');
router.get("/", productController.getProduct);

router.post("/", productController.postProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
