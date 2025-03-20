const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML Form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Handle POST request
app.post("/add-product", (req, res) => {
  const productName = req.body.productName;
  console.log("Received Product:", productName);
  res.json({ message: `Product "${productName}" added successfully!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
