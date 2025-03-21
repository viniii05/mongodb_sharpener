document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-container");

    try {
        const res = await fetch("/products");
        const products = await res.json();

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

// ✅ Fixed: Add token to request
function addToCart(productId, productName) {
    const token = localStorage.getItem("token"); // ✅ Get token from storage

    if (!token) {
        alert("You must be logged in to add items to the cart.");
        return;
    }

    fetch('/cart', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // ✅ Send token
        },
        body: JSON.stringify({ productId }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(`${productName} added to cart!`);
        } else {
            alert('Failed to add product to cart');
        }
    })
    .catch(error => console.error('Error adding to cart:', error));
}

