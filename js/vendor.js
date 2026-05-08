// ===== MENU DATA =====
const MENU = [
  {
    id: 1,
    name: "Dragon Roll",
    price: 18.50,
    desc: "Fresh eel and cucumber topped with avocado, sesame seeds and our signature unagi sauce. A crowd favourite!",
    category: "sushi",
    tag: "SUSHI",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&q=80",
    popular: true,
  },
  {
    id: 2,
    name: "Tonkotsu Ramen",
    price: 16.00,
    desc: "Rich 12-hour pork bone broth, soft-boiled marinated egg, melt-in-your-mouth chashu pork.",
    category: "ramen",
    tag: "RAMEN",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&q=80",
    popular: true,
  },
  {
    id: 3,
    name: "Salmon Nigiri",
    price: 12.00,
    desc: "Hand-pressed vinegared rice topped with premium Atlantic salmon. Simply fresh.",
    category: "sushi",
    tag: "SUSHI",
    img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&q=80",
    popular: true,
  },
  {
    id: 4,
    name: "Shrimp Tempura",
    price: 14.50,
    desc: "Lightly battered and crispy deep-fried shrimp served with soy-ginger dipping sauce.",
    category: "appetizer",
    tag: "APPETIZER",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
    popular: true,
  },
  {
    id: 5,
    name: "Spicy Tuna Roll",
    price: 15.00,
    desc: "Fresh tuna mixed with sriracha mayo and cucumber, topped with sesame seeds and green onion.",
    category: "sushi",
    tag: "SUSHI",
    img: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=300&q=80",
    popular: false,
  },
  {
    id: 6,
    name: "Miso Ramen",
    price: 14.00,
    desc: "Traditional miso-based broth with corn, bamboo shoots, nori, green onion and a seasoned egg.",
    category: "ramen",
    tag: "RAMEN",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80",
    popular: false,
  },
  {
    id: 7,
    name: "Edamame",
    price: 6.50,
    desc: "Steamed salted soybeans lightly seasoned with sea salt and a dash of sesame oil.",
    category: "appetizer",
    tag: "APPETIZER",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80",
    popular: false,
  },
  {
    id: 8,
    name: "Mochi Ice Cream",
    price: 8.00,
    desc: "Soft rice cake filled with creamy ice cream in matcha, strawberry and mango flavors.",
    category: "dessert",
    tag: "DESSERT",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80",
    popular: false,
  },
  {
    id: 9,
    name: "Matcha Latte",
    price: 5.50,
    desc: "Premium ceremonial-grade matcha whisked with steamed oat milk and a touch of honey.",
    category: "drink",
    tag: "DRINK",
    img: "https://images.unsplash.com/photo-1504459468578-b35abf2da3aa?w=300&q=80",
    popular: false,
  },
  {
    id: 10,
    name: "Gyoza (6 pcs)",
    price: 9.50,
    desc: "Pan-fried pork and cabbage dumplings with crispy bottoms, served with ponzu dipping sauce.",
    category: "appetizer",
    tag: "APPETIZER",
    img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&q=80",
    popular: false,
  },
  {
    id: 11,
    name: "Avocado Roll",
    price: 10.00,
    desc: "Creamy avocado wrapped in seasoned sushi rice and nori, topped with sesame seeds.",
    category: "sushi",
    tag: "SUSHI",
    img: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=300&q=80",
    popular: false,
  },
  {
    id: 12,
    name: "Yuzu Cheesecake",
    price: 9.00,
    desc: "Light and airy Japanese-style cheesecake infused with tangy yuzu citrus. Melt-in-mouth perfection.",
    category: "dessert",
    tag: "DESSERT",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80",
    popular: false,
  },
];

// ===== STATE =====
let cart = [];
let activeCategory = "all";
let activeSort = "popular";
let maxPrice = 30;
let searchQuery = "";

// ===== DOM REFS =====
const dishesGrid    = document.getElementById("dishesGrid");
const cartCount     = document.getElementById("cartCount");
const cartTotal     = document.getElementById("cartTotal");
const cartItems     = document.getElementById("cartItems");
const cartFooter    = document.getElementById("cartFooter");
const cartSidebar   = document.getElementById("cartSidebar");
const cartOverlay   = document.getElementById("cartOverlay");
const cartBtn       = document.getElementById("cartBtn");
const closeCart     = document.getElementById("closeCart");
const subtotalEl    = document.getElementById("subtotal");
const grandTotalEl  = document.getElementById("grandTotal");
const noResults     = document.getElementById("noResults");
const searchInput   = document.getElementById("searchInput");
const filterPanel   = document.getElementById("filterPanel");
const filterToggle  = document.getElementById("filterToggle");
const priceRange    = document.getElementById("priceRange");
const priceVal      = document.getElementById("priceVal");
const applyFilter   = document.getElementById("applyFilter");
const toast         = document.getElementById("toast");
const toastMsg      = document.getElementById("toastMsg");

// ===== RENDER DISHES =====
function renderDishes() {
  let items = [...MENU];

  // Category filter
  if (activeCategory !== "all") {
    items = items.filter(d => d.category === activeCategory);
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q)
    );
  }

  // Max price filter
  items = items.filter(d => d.price <= maxPrice);

  // Sort
  if (activeSort === "popular") {
    items.sort((a, b) => b.popular - a.popular);
  } else if (activeSort === "price-low") {
    items.sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-high") {
    items.sort((a, b) => b.price - a.price);
  } else if (activeSort === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (items.length === 0) {
    dishesGrid.innerHTML = "";
    noResults.style.display = "flex";
    return;
  }
  noResults.style.display = "none";

  dishesGrid.innerHTML = items.map((dish, idx) => `
    <div class="dish-card" style="animation-delay:${idx * 0.07}s">
      <div class="dish-img-wrap">
        <img src="${dish.img}" alt="${dish.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80'"/>
      </div>
      <div class="dish-info">
        <div class="dish-top">
          <span class="dish-name">${dish.name}</span>
          <span class="dish-price">$${dish.price.toFixed(2)}</span>
        </div>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-footer">
          <span class="dish-tag">${dish.tag}</span>
          <button class="add-btn" onclick="addToCart(${dish.id})">
            <i class="fa-solid fa-cart-plus"></i> Add to Order
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== CART =====
function addToCart(id) {
  const dish = MENU.find(d => d.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...dish, qty: 1 });
  }
  updateCartUI();
  showToast(`${dish.name} added to cart!`);
  bumpCount();
}

function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.qty * c.price, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty</p>
      </div>`;
    cartFooter.style.display = "none";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&q=80'"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn minus" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn plus" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("");
    cartFooter.style.display = "block";
    subtotalEl.textContent = `$${totalPrice.toFixed(2)}`;
    grandTotalEl.textContent = `$${(totalPrice + 2.99).toFixed(2)}`;
  }
}

function bumpCount() {
  cartCount.classList.remove("bump");
  void cartCount.offsetWidth; // reflow
  cartCount.classList.add("bump");
}

// ===== CART OPEN/CLOSE =====
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCartFn() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartFn);
cartOverlay.addEventListener("click", closeCartFn);

// ===== CATEGORIES =====
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderDishes();
  });
});

// ===== SEARCH =====
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.trim();
  renderDishes();
});

// ===== FILTER PANEL TOGGLE =====
function toggleFilter() {
  filterPanel.classList.toggle("open");
}
filterToggle.addEventListener("click", toggleFilter);
document.getElementById("filterBtn").addEventListener("click", toggleFilter);

// ===== PRICE RANGE =====
priceRange.addEventListener("input", () => {
  priceVal.textContent = `$${priceRange.value}`;
});

// ===== SORT OPTIONS =====
document.querySelectorAll(".filter-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-opt").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeSort = btn.dataset.sort;
  });
});

// ===== APPLY FILTER =====
applyFilter.addEventListener("click", () => {
  maxPrice = parseInt(priceRange.value);
  renderDishes();
  filterPanel.classList.remove("open");
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== INIT =====
renderDishes();
// ADDED THESE FUNCTIONS TO RUN THE TEST
global.addToCart = addToCart;
global.changeQty = changeQty;
global.updateCartUI = updateCartUI;
global.openCart = openCart;
global.closeCartFn = closeCartFn;
global.renderDishes = renderDishes;
global.showToast = showToast;
global.toggleFilter = toggleFilter;