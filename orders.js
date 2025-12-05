function displayOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersList = document.getElementById("orders-list");
  
  if (orders.length === 0) {
    ordersList.innerHTML = "<p style='text-align: center; padding: 40px;'>No orders yet. <a href='shop.html'>Start shopping</a></p>";
    return;
  }

  ordersList.innerHTML = orders.reverse().map(order => `
    <div class="order-card">
      <div class="order-header">
        <h3>Order ID: ${order.orderId}</h3>
        <p class="order-date">${order.date}</p>
      </div>
      <div class="order-items">
        <h4>Items:</h4>
        ${order.items.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-info">
              <p><strong>${item.name}</strong></p>
              <p>Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="order-total">
        <h3>Total: ₹${order.total}</h3>
      </div>
    </div>
  `).join("");
}

window.onload = () => {
  displayOrders();
};
