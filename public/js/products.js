document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");

    try {
        const res = await fetch("/admin/admin-product", {
            headers: { "Accept": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const products = await res.json();

        productList.innerHTML = "";

        products.forEach(product => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h2>${product.title}</h2>
                <img src="${product.imageUrl}" alt="${product.title}" style="width: 150px;">
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
                <a href="/admin/edit-product/${product._id}"><button>Edit</button></a>
            `;
            productList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading products:", error);
        productList.innerHTML = "<p>Failed to load products.</p>";
    }
});

async function deleteProduct(productId) {
    try {
        const res = await fetch("/admin/delete-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId })
        });

        if (res.ok) {
            location.reload();
        } else {
            alert("Error deleting product");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}
