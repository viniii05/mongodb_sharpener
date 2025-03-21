document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-container");

    try {
        const res = await fetch("/products"); // Fetch JSON data
        const products = await res.json(); // Convert response to JSON

        container.innerHTML = products.map(prod => `
            <div class="product">
                <img src="${prod.imageUrl}" alt="${prod.title}" style="width:100%; height:auto;">
                <h3>${prod.title}</h3>
                <p class="price">$${prod.price}</p>
                <p>${prod.description}</p>
                <button onclick="window.location.href='/products/${prod._id}'">Show Details</button>
                <button onclick="addToCart('${prod._id}', '${prod.title}')">Add to Cart</button>
            </div>
        `).join('');
    } catch (err) {
        console.error("Error fetching products:", err);
        container.innerHTML = "<p>Failed to load products.</p>";
    }
});

// Function to add to cart
function addToCart(productId, productName) {
    fetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `productId=${productId}`
    }).then(response => {
        if (response.ok) {
            alert(`${productName} added to cart!`);
        } else {
            alert('Failed to add product to cart');
        }
    }).catch(error => console.error('Error adding to cart:', error));
}
