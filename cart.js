let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p style='text-align: center; padding: 40px;'>Your cart is empty. <a href='shop.html'>Continue shopping</a></p>";
    document.getElementById("subtotal").innerText = "0";
    document.getElementById("tax").innerText = "0";
    document.getElementById("total").innerText = "0";
    return;
  }

  cartItemsDiv.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="item-price">₹${item.price}</p>
        <div class="item-quantity">
          <button onclick="updateQty(${i}, -1)">-</button>
          <input type="number" value="${item.qty}" readonly>
          <button onclick="updateQty(${i}, 1)">+</button>
        </div>
        <p class="item-total">Total: ₹${item.price * item.qty}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
    </div>
  `).join("");
  
  updateTotal();
}

function updateQty(i, change) {
  cart[i].qty += change;
  if (cart[i].qty <= 0) {
    removeItem(i);
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  
  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("tax").innerText = tax;
  document.getElementById("total").innerText = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const order = {
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
    orderId: "ORD" + Date.now()
  };
  
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  
  alert("Order placed successfully! Order ID: " + order.orderId);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  setTimeout(() => window.location.href = "orders.html", 1500);
}

window.onload = () => {
  renderCart();
  updateTotal();
};
