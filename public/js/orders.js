document.addEventListener("DOMContentLoaded", async () => {
    const ordersContainer = document.getElementById("orders-container");

    try {
        const res = await fetch("/orders");
        const orders = await res.json();

        if (!orders || orders.length === 0) {
            ordersContainer.innerHTML = "<p>No past orders found.</p>";
            return;
        }

        ordersContainer.innerHTML = orders.map(order => `
            <div class="order">
                <h4>Order ID: ${order._id}</h4>
                <p>Ordered on: ${new Date(order.date).toLocaleDateString()}</p>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.name} - $${item.price} (x${item.quantity})</li>
                    `).join("")}
                </ul>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching orders:", error);
        ordersContainer.innerHTML = "<p>Failed to load orders.</p>";
    }
});
