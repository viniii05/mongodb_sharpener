const express = require('express');

const router = express.Router();

const shopController = require('../Controllers/shopController');

router.get('/products' , shopController.getProducts);
router.get('/products/:productId', shopController.getProductById);
module.exports = router;