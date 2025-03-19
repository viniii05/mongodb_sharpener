const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON data

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next(); // Move to the next middleware or route handler
});

// Routes
app.get("/products", (req, res) => {
    res.send("Here is the list of all products.");
});

app.post("/products", (req, res) => {
    res.send("A new product has been added.");
});

app.get("/categories", (req, res) => {
    res.send("Here is the list of all categories.");
});

app.post("/categories", (req, res) => {
    res.send("A new category has been created.");
});

// Start the Server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
