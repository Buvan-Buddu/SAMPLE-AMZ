const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "images/t-shirt.jpg", description: "Premium quality cotton t-shirt" },
  { id: 2, name: "Jeans", price: 899, image: "images/jeans.jpg", description: "Stylish denim jeans" },
  { id: 3, name: "Shoes", price: 1999, image: "images/shoes.jpg", description: "Comfortable casual shoes" },
  { id: 4, name: "Smart Watch", price: 2999, image: "images/smartwatch.jpg", description: "Latest smartwatch technology" },
  { id: 5, name: "Hoodie", price: 799, image: "images/hoodie.jpg", description: "Warm and cozy hoodie" },
  { id: 6, name: "Accessory Pack", price: 899, image: "images/ap.webp", description: "Essential accessories bundle" },
];

function displayProducts(productsToShow = products) {
  const productList = document.getElementById("product-list");
  if (productsToShow.length === 0) {
    productList.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No products found.</p>";
    return;
  }
  productList.innerHTML = productsToShow.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">₹${product.price}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="view-product-btn" onclick="window.location.href='product.html?id=${product.id}'">View Details</button>
    </div>
  `).join("");
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product.name + " added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}

function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

window.onload = () => {
  displayProducts();
  updateCartCount();
};