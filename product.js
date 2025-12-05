// Product data from shop.js
const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "images/t-shirt.jpg", description: "Premium quality cotton t-shirt. Perfect for everyday wear!" },
  { id: 2, name: "Jeans", price: 899, image: "images/jeans.jpg", description: "Stylish denim jeans. Comfortable and durable." },
  { id: 3, name: "Shoes", price: 1999, image: "images/shoes.jpg", description: "Comfortable casual shoes. Great for walking." },
  { id: 4, name: "Smart Watch", price: 2999, image: "images/smartwatch.jpg", description: "Latest smartwatch technology with health tracking." },
  { id: 5, name: "Hoodie", price: 799, image: "images/hoodie.jpg", description: "Warm and cozy hoodie. Perfect for cold weather." },
  { id: 6, name: "Accessory Pack", price: 899, image: "images/ap.webp", description: "Essential accessories bundle" },
];

const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));
const detailEl = document.getElementById('product-detail');

function loadProduct() {
  if (!id) {
    detailEl.innerHTML = '<p style="text-align: center; padding: 40px;">Product ID missing</p>';
    return;
  }
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    detailEl.innerHTML = '<p style="text-align: center; padding: 40px;">Product not found</p>';
    return;
  }

  detailEl.innerHTML = `
    <div class="prod-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="prod-meta">
      <h2>${product.name}</h2>
      <p class="description">${product.description}</p>
      <p class="price">₹${product.price}</p>
      <p class="availability" style="color: green; font-weight: bold;">✓ In Stock</p>
      <div class="product-actions">
        <button id="addBtn" class="add-to-cart-btn">Add to Cart</button>
        <button onclick="window.location.href='shop.html'" class="continue-btn">Back to Shop</button>
      </div>
      <div class="product-info">
        <h3>Product Details</h3>
        <p>This is a high-quality product. We guarantee the best price and quality.</p>
        <p>Free shipping on orders above ₹500.</p>
        <p>30-day return policy.</p>
      </div>
    </div>
  `;
  
  document.getElementById('addBtn').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
    
    // Update cart count
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      cartCountEl.textContent = cart.reduce((s, i) => s + i.qty, 0);
    }
  });
}

window.onload = () => {
  loadProduct();
};
