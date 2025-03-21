const express = require('express');

const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const shopController = require('../controllers/shopController');

router.get('/products' , shopController.getProducts);
router.get('/products/:productId', shopController.getProductById);

router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/shop.html"));
});
module.exports = router;