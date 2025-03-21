const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.fetchAll();
        let productHtml = products.map(prod => `
            <div class="product">
                <img src="${prod.imageUrl.startsWith('http') ? prod.imageUrl : '/default.jpg'}" alt="${prod.title}">
                <h3>${prod.title}</h3>
                <p class="price">$${prod.price}</p>
                <p>${prod.description}</p>
                <button onclick="window.location.href='/products/${prod._id}'">Show Details</button>
                <button onclick="alert('${prod.title} added to cart!')">Add to Cart</button>
            </div>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Product List</title>
                <link rel="stylesheet" href="/css/products.css">
            </head>
            <body>
                <header class="main-header">
        <div class="img-div">
            <!-- <img src="../NSkEnhance.png" alt="logo" class="img"> -->
        </div>
        <nav class="main-header__nav">
            <ul class="main-header__item_list">
                <li class="main-header__items"><a href="/products">Shop</a></li>
                <li class="main-header__items"><a href="/admin/add-product">Add Product</a></li>
                <li class="main-header__items"><a href="/contactUs">Contact us</a></li>
                <li class="main-header__items"><a href="/cart">Cart</a></li>
                <li class="main-header__items"><a href="/admin/admin-product">Admin Product</a></li>
            </ul>
        </nav>
    </header>
                <h2>Available Products</h2>
                <div class="product-container">
                    ${productHtml}
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("Error fetching products");
    }
};


exports.getProductById = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            if (product) {
                product.price = Number(product.price); 
                res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.title}</title>
                <link rel="stylesheet" href="/css/products.css">

            </head>
            <body>
                <header class="main-header">
                    <div class="img-div">
                        <!-- <img src="../NSkEnhance.png" alt="logo" class="img"> -->
                    </div>
                    <nav class="main-header__nav">
                        <ul class="main-header__item_list">
                            <li class="main-header__items"><a href="/">Shop</a></li>
                            <li class="main-header__items"><a href="/admin/add-product">Add Product</a></li>
                            <li class="main-header__items"><a href="/contactUs">Contact us</a></li>
                            <li class="main-header__items"><a href="/cart">Cart</a></li>
                            <li class="main-header__items"><a href="/admin/admin-product">Admin Product</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>${product.title}</h1>
                    <img src="${product.imageUrl}" alt="${product.title}" style="width: 300px;">
                    <p>${product.description}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                    <script>
                        function addToCart(productId) {
                            fetch('/cart', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: 'productId=' + productId
                            })
                            .then(response => {
                                if (response.ok) {
                                    alert('Product added to cart');
                                } else {
                                    alert('Failed to add product to cart');
                                }
                            })
                            .catch(error => console.error('Error adding product to cart:', error));
                        }
                    </script>
                </main>
            </body>
            </html>
          `);
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).send('Server Error');
        });
}