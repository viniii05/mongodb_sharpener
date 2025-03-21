document.addEventListener("DOMContentLoaded", async () => {
    const cartContainer = document.getElementById("cart-container");
    const orderButton = document.getElementById("order-button");

    try {
        const res = await fetch("/cart/data");
        const cart = await res.json();

        if (!cart.items || cart.items.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            orderButton.style.display = "none";
            return;
        }

        cartContainer.innerHTML = cart.items.map(item => `
            <div>
                <p>${item.name} - $${item.price} (x${item.quantity})</p>
                <button class="remove-item" data-id="${item._id}">Remove</button>
            </div>
        `).join("");

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", async (event) => {
                const productId = event.target.dataset.id;
                await fetch(`/cart/${productId}`, { method: "DELETE" });
                location.reload();
            });
        });

        orderButton.addEventListener("click", async () => {
            const response = await fetch("/order", { method: "POST" });

            if (response.ok) {
                alert("Order placed successfully!");
                location.reload();
            } else {
                alert("Failed to place order.");
            }
        });

    } catch (error) {
        console.error("Error fetching cart:", error);
        cartContainer.innerHTML = "<p>Failed to load cart.</p>";
    }
});
