const express = require("express");
const router = express.Router();
const userController = require('../Controllers/userController');

router.get("/", userController.getHome);

router.post("/", userController.postHome);

router.get("/:id", userController.getById);

module.exports = router;
