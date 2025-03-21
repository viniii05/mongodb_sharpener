document.addEventListener("DOMContentLoaded", async () => {
    const productId = window.location.pathname.split("/").pop();
    const container = document.getElementById("product-detail");

    try {
        const res = await fetch(`/products/${productId}`, {
            headers: { "Accept": "application/json" }
        });
        const product = await res.json();

        if (product) {
            container.innerHTML = `
                <h1>${product.title}</h1>
                <img src="${product.imageUrl}" alt="${product.title}" style="width:100%; height:auto;">
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
                <button onclick="addToCart('${product._id}', '${product.title}')">Add to Cart</button>
            `;
        }
    } catch (error) {
        console.error("Error loading product:", error);
        container.innerHTML = "<p>Product not found.</p>";
    }
});

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
