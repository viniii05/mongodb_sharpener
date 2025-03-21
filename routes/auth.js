const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const path = require("path");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
});
module.exports = router;
