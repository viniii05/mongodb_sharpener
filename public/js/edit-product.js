document.addEventListener("DOMContentLoaded", async () => {
    const productId = window.location.pathname.split("/").pop();
    const form = document.getElementById("edit-product-form");

    const res = await fetch(`/admin/edit-product/${productId}`);
    const product = await res.json();

    if (!product) {
        alert("Product not found!");
        window.location.href = "/admin/admin-product";
    }

    document.getElementById("productId").value = product._id;
    document.getElementById("title").value = product.title;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;
    document.getElementById("imageUrl").value = product.imageUrl;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedProduct = {
            productId: document.getElementById("productId").value,
            title: document.getElementById("title").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            imageUrl: document.getElementById("imageUrl").value,
        };

        const response = await fetch("/admin/edit-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            alert("Product updated successfully!");
            window.location.href = "/admin/admin-product";
        } else {
            alert("Failed to update product!");
        }
    });
});
