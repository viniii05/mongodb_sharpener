const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.post("/add-product", adminController.postAddProduct);
router.get("/admin-product", adminController.getAdminProduct);
router.get("/add-product", adminController.getAddProductPage);
router.get("/edit-product/:productId", adminController.getEditProductPage);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
