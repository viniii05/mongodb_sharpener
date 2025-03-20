const express = require("express");
const router = express.Router();

const productController = require('../Controllers/productController');
router.get("/", productController.getAllProducts);

router.post("/", productController.addProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
