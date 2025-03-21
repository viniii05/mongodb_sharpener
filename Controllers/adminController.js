const path = require("path");
const { ObjectId } = require('mongodb');

const Product = require("../models/product");

exports.postAddProduct = async (req, res) => {
    try {
        const { title, price, description, imageUrl } = req.body;

        if (!title || !price || !description || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = new Product(title, price, description, imageUrl);
        await product.save();

        console.log("Product added!");
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/add-product.html"));
};

exports.getAdminProduct = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Admin Products</title>
              <link rel="stylesheet" href="/css/products.css">
          </head>
          <body>
              <header class="main-header">
                  <nav class="main-header__nav">
                      <ul class="main-header__item_list">
                          <li class="main-header__items"><a href="/products">Shop</a></li>
                          <li class="main-header__items"><a href="/admin/add-product">Add Product</a></li>
                          <li class="main-header__items"><a href="/cart">Cart</a></li>
                          <li class="main-header__items"><a href="/admin/admin-product">Admin Product</a></li>
                      </ul>
                  </nav>
              </header>
              <main>
                  <h1>Admin Products</h1>
                  <ul id="product-list">
                      ${products.map(product => `
                          <li>
                              <h2>${product.title}</h2>
                              <img src="${product.imageUrl}" alt="${product.title}" style="width: 150px;">
                              <p>Price: $${product.price.toFixed(2)}</p>
                              <form action="/admin/delete-product" method="POST">
                                  <input type="hidden" name="productId" value="${product._id}">
                                  <button type="submit">Delete</button>
                              </form>
                              <a href="/admin/edit-product/${product._id}"><button>Edit</button></a>
                          </li>
                      `).join('')}
                  </ul>
              </main>
          </body>
          </html>
        `);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            res.status(500).send("Server Error");
        });
};

exports.getEditProductPage = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.send(`
                <form action="/admin/edit-product" method="POST">
                    <input type="hidden" name="productId" value="${product._id}">
                    <input type="text" name="title" value="${product.title}" required>
                    <input type="number" name="price" value="${product.price}" required>
                    <textarea name="description" required>${product.description}</textarea>
                    <input type="text" name="imageUrl" value="${product.imageUrl}" required>
                    <button type="submit">Update Product</button>
                </form>
            `);
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
    const { productId, title, price, description, imageUrl } = req.body;
    const updatedProduct = new Product(title, price, description, imageUrl, productId);
    updatedProduct.save()
        .then(() => res.redirect("/admin/admin-product"))
        .catch(err => console.log(err));
};

exports.postDeleteProduct = async (req, res) => {
    try {
        console.log("Received delete request:", req.body); // Debugging

        const prodId = req.body.productId;
        if (!prodId) {
            console.log("No product ID provided.");
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (!ObjectId.isValid(prodId)) {
            console.log("Invalid product ID format:", prodId);
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        console.log("Attempting to delete product with ID:", prodId);

        const result = await Product.deleteById(prodId);
        // if (result.deletedCount === 0) {
        //     console.log("No product found with that ID!");
        //     return res.status(404).json({ message: "Product not found" });
        // }

        console.log("Product deleted successfully!");
        res.status(200).json({ message: "Product deleted!" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


