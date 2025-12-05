async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

loadProducts();
