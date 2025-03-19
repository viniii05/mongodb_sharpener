const express = require("express");
const app = express();
const port = 4000;

// Middleware to parse JSON requests (for POST requests)
app.use(express.json());

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

// Wildcard Route - Handle Undefined Routes (404)
app.use("*", (req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
