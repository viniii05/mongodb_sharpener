// document.addEventListener("DOMContentLoaded", () => {
//     const cartContainer = document.getElementById("cart-container");

//     // ✅ Fixed: Use correct API and include token
//     async function loadCart() {
//         const res = await fetch("/cart", {
//             headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//         });

//         const cart = await res.json();
        
//         cartContainer.innerHTML = cart.items.map(item => `
//             <div>
//                 <p>${item.name} - ${item.price} USD</p>
//                 <p>Quantity: ${item.quantity}</p>
//                 <button class="remove-item" data-id="${item._id}">Remove</button>
//             </div>
//         `).join("");

//         document.querySelectorAll(".remove-item").forEach(button => {
//             button.addEventListener("click", async () => {
//                 const productId = button.dataset.id;
//                 await fetch(`/cart/${productId}`, { 
//                     method: "DELETE",
//                     headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } // ✅ Include token
//                 });
//                 loadCart();
//             });
//         });
//     }

//     loadCart();
// });

document.addEventListener("DOMContentLoaded", async () => {
    const cartContainer = document.getElementById("cart-container");

    try {
        const res = await fetch("/cart/data"); // Fetch JSON cart data
        const cart = await res.json();

        if (!cart.items || cart.items.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartContainer.innerHTML = cart.items.map(item => `
            <div>
                <p>${item.name} - $${item.price} (x${item.quantity})</p>
                <button class="remove-item" data-id="${item._id}">Remove</button>
            </div>
        `).join("");

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", async () => {
                const productId = button.dataset.id;
                await fetch(`/cart/${productId}`, { method: "DELETE" });
                location.reload(); // Refresh cart after removal
            });
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        cartContainer.innerHTML = "<p>Failed to load cart.</p>";
    }
});
