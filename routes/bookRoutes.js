const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log(` ${req.method} request made to ${req.url}`);
    next(); 
});

router.get("/", (req, res) => {
    console.log("Fetching all books...");
    res.send("Here is the list of books!");
});

router.post("/", (req, res) => {
    console.log("Received book data:", req.body);
    res.send("Book has been added!");
});

module.exports = router;
