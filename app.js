const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests (for POST requests)
app.use(express.json());

// Routes
app.get("/orders", (req, res) => {
    res.send("Here is the list of all orders.");
});

app.post("/orders", (req, res) => {
    res.send("A new order has been created.");
});

app.get("/users", (req, res) => {
    res.send("Here is the list of all users.");
});

app.post("/users", (req, res) => {
    res.send("A new user has been added.");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
