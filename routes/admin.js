const express = require('express');

const router = express.Router();

const adminController = require('../Controllers/adminController');

router.post('/add-product', adminController.postAddProduct);
router.get('/add-product', adminController.getAddProductPage);
module.exports = router;