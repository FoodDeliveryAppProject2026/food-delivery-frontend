// ===== MENU DATA =====
const menuData = [
  {
    id: "offers",
    title: "Offers",
    items: [
      {
        id: 1,
        name: "Real Tasty 140g Sandwich",
        desc: "1 beef burger patty, Swiss cheese, lettuce, and a really tasty sauce",
        price: 159,
        oldPrice: 219,
        likes: 535,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
      {
        id: 2,
        name: "Double Double Offer",
        desc: "2 sandwiches 140g of your choice, 2 drinks, and 2 classic fries",
        price: 389,
        oldPrice: 598,
        likes: 3313,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
      },
      {
        id: 3,
        name: "Nacho + Red Bull Offer",
        desc: "Choice of nacho toasted banana or marshmallow puff, served with red bull",
        price: 179,
        oldPrice: 194,
        likes: 105,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80",
      },
    ],
  },
  {
    id: "top",
    title: "Top Dishes",
    items: [
      {
        id: 4,
        name: "Willy's Nacho Burger",
        desc: "Beef patty, beef bacon, chili beef, caramelized onions, cheese sauce, jalapeno, jalapeno sauce, deep fried tortilla bread",
        price: 239,
        oldPrice: 359,
        likes: 5240,
        img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
      },
      {
        id: 5,
        name: "Smokehouse BBQ",
        desc: "Beef patty, beef bacon, frizzled fried onions, American cheese, hickory BBQ sauce, lettuce, tomato and Louisiana sauce",
        price: 199,
        oldPrice: null,
        likes: 4102,
        img: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&q=80",
      },
      {
        id: 6,
        name: "Classic Cheeseburger",
        desc: "Juicy beef patty, cheddar cheese, pickles, mustard, ketchup and fresh onion on a toasted brioche bun",
        price: 139,
        oldPrice: null,
        likes: 3890,
        img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
      },
    ],
  },
  {
    id: "new",
    title: "New Items",
    items: [
      {
        id: 7,
        name: "Truffle Mushroom Burger",
        desc: "Beef patty, sautéed mushrooms, truffle mayo, arugula, and Swiss cheese on a pretzel bun",
        price: 249,
        oldPrice: null,
        likes: 312,
        img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
      },
      {
        id: 8,
        name: "Spicy Nashville Chicken",
        desc: "Crispy chicken fillet, Nashville hot sauce, coleslaw, pickles, and honey drizzle",
        price: 189,
        oldPrice: null,
        likes: 178,
        img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
      },
    ],
  },
  {
    id: "value",
    title: "Value Meals",
    items: [
      {
        id: 9,
        name: "Value Combo 1",
        desc: "140g beef sandwich + classic fries + any drink",
        price: 189,
        oldPrice: 240,
        likes: 2100,
        img: "https://images.unsplash.com/photo-1619881590738-a111d176d906?w=400&q=80",
      },
      {
        id: 10,
        name: "Value Combo 2",
        desc: "Crispy chicken sandwich + seasoned fries + any drink",
        price: 169,
        oldPrice: 210,
        likes: 1850,
        img: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80",
      },
    ],
  },
  {
    id: "burgermeal",
    title: "Burger Meals",
    items: [
      {
        id: 11,
        name: "Classic Meal",
        desc: "Classic beef burger + fries + drink",
        price: 229,
        oldPrice: null,
        likes: 1560,
        img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&q=80",
      },
      {
        id: 12,
        name: "BBQ Bacon Meal",
        desc: "BBQ bacon burger + onion rings + drink",
        price: 269,
        oldPrice: null,
        likes: 980,
        img: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=400&q=80",
      },
    ],
  },
  {
    id: "burger",
    title: "Burger",
    items: [
      {
        id: 13,
        name: "Single Patty",
        desc: "100% beef patty, lettuce, tomato, pickles, special sauce",
        price: 99,
        oldPrice: null,
        likes: 2340,
        img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&q=80",
      },
      {
        id: 14,
        name: "Double Patty",
        desc: "Two 100% beef patties, double cheese, lettuce, special sauce",
        price: 149,
        oldPrice: null,
        likes: 3120,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
    ],
  },
  {
    id: "chickenmeal",
    title: "Chicken Meals",
    items: [
      {
        id: 15,
        name: "Crispy Chicken Meal",
        desc: "Crispy chicken fillet + fries + drink",
        price: 199,
        oldPrice: null,
        likes: 1430,
        img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80",
      },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    items: [
      {
        id: 16,
        name: "Grilled Chicken Sandwich",
        desc: "Grilled chicken breast, garlic sauce, lettuce, tomato on whole wheat bun",
        price: 159,
        oldPrice: null,
        likes: 890,
        img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
      },
      {
        id: 17,
        name: "Crispy Chicken Sandwich",
        desc: "Crispy fried chicken, mayo, pickles, on brioche",
        price: 149,
        oldPrice: null,
        likes: 2200,
        img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
      },
    ],
  },
  {
    id: "nachomeal",
    title: "Nacho Meals",
    items: [
      {
        id: 18,
        name: "Nacho Burger Meal",
        desc: "Willy's nacho burger + nacho chips + drink",
        price: 299,
        oldPrice: 359,
        likes: 760,
        img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
      },
    ],
  },
  {
    id: "nacho",
    title: "Nacho",
    items: [
      {
        id: 19,
        name: "Loaded Nachos",
        desc: "Tortilla chips, cheese sauce, jalapeños, sour cream, salsa",
        price: 89,
        oldPrice: null,
        likes: 540,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      {
        id: 20,
        name: "Classic Fries",
        desc: "Crispy golden fries with a light seasoning",
        price: 45,
        oldPrice: null,
        likes: 4500,
        img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
      },
      {
        id: 21,
        name: "Onion Rings",
        desc: "Battered and fried crispy onion rings",
        price: 55,
        oldPrice: null,
        likes: 1200,
        img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80",
      },
      {
        id: 22,
        name: "Mozzarella Sticks",
        desc: "Golden fried mozzarella sticks with marinara dip",
        price: 65,
        oldPrice: null,
        likes: 870,
        img: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&q=80",
      },
    ],
  },
  {
    id: "sauces",
    title: "Sauces",
    items: [
      {
        id: 23,
        name: "Special Willy's Sauce",
        desc: "Our secret house sauce",
        price: 15,
        oldPrice: null,
        likes: 340,
        img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=80",
      },
      {
        id: 24,
        name: "Chipotle Mayo",
        desc: "Smoky chipotle mayonnaise",
        price: 15,
        oldPrice: null,
        likes: 210,
        img: "https://images.unsplash.com/photo-1612871689880-73cf8df1d1eb?w=400&q=80",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        id: 25,
        name: "Nutella Waffle",
        desc: "Crispy waffle topped with Nutella, powdered sugar and fresh strawberries",
        price: 85,
        oldPrice: null,
        likes: 1100,
        img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80",
      },
      {
        id: 26,
        name: "Chocolate Lava Cake",
        desc: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream",
        price: 99,
        oldPrice: null,
        likes: 870,
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      {
        id: 27,
        name: "Blue Passion",
        desc: "Refreshing blue passion fruit sparkling drink",
        price: 25,
        oldPrice: null,
        likes: 28,
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
      },
      {
        id: 28,
        name: "Lemonade",
        desc: "Fresh squeezed lemonade with mint",
        price: 25,
        oldPrice: null,
        likes: 23,
        img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
      },
      {
        id: 29,
        name: "Fresh Orange Juice",
        desc: "Freshly squeezed orange juice, served cold",
        price: 35,
        oldPrice: null,
        likes: 95,
        img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
      },
    ],
  },
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem("hotmeal_cart") || "[]");
let likedItems = JSON.parse(localStorage.getItem("hotmeal_likes") || "[]");
let modalItem = null;
let modalQty = 1;

// ===== RENDER MENU =====
function renderMenu(filter = "") {
  const container = document.getElementById("menuSections");
  container.innerHTML = "";
  const q = filter.toLowerCase().trim();

  menuData.forEach((section) => {
    const items = q
      ? section.items.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.desc.toLowerCase().includes(q),
        )
      : section.items;
    if (!items.length) return;

    const sec = document.createElement("div");
    sec.className = "menu-section";
    sec.id = "sec-" + section.id;
    sec.innerHTML = `<h2 class="section-title">${section.title}</h2>`;

    items.forEach((item) => {
      const liked = likedItems.includes(item.id);
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-desc">${item.desc}</div>
          <div class="item-bottom">
            <div class="item-price-row">
              <button class="add-btn" data-id="${item.id}" title="Add to cart">+</button>
              ${item.oldPrice ? `<span class="old-price">${item.oldPrice} EGP</span>` : ""}
              <span class="price">${item.price} EGP</span>
            </div>
            <div class="item-likes">
              <button class="like-btn ${liked ? "liked" : ""}" data-id="${item.id}" title="Like">
                ${liked ? "❤️" : "🤍"}
              </button>
              <span class="likes-count" data-id="${item.id}">${item.likes}</span>
            </div>
          </div>
        </div>
        <div class="item-img-wrap">
          <img src="${item.img}" alt="${item.name}" loading="lazy"/>
        </div>
      `;

      // Click card → open modal (not add/like buttons)
      card.addEventListener("click", (e) => {
        if (e.target.closest(".add-btn") || e.target.closest(".like-btn"))
          return;
        openModal(item);
      });

      // Add button
      card.querySelector(".add-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(item, 1);
        animateAdd(e.currentTarget);
      });

      // Like button
      card.querySelector(".like-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike(item, card);
      });

      sec.appendChild(card);
    });

    container.appendChild(sec);
  });
}

// ===== CART =====
function saveCart() {
  localStorage.setItem("hotmeal_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item, qty) {
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      qty,
    });
  }
  saveCart();
}

function updateCartCount() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById("cartCount").textContent = total;
}

function animateAdd(btn) {
  btn.style.transform = "scale(1.4)";
  btn.textContent = "✓";
  setTimeout(() => {
    btn.style.transform = "";
    btn.textContent = "+";
  }, 700);
}

// ===== LIKES =====
function toggleLike(item, card) {
  const btn = card.querySelector(`.like-btn[data-id="${item.id}"]`);
  const countEl = card.querySelector(`.likes-count[data-id="${item.id}"]`);
  const liked = likedItems.includes(item.id);
  let count = parseInt(countEl.textContent);

  if (liked) {
    likedItems = likedItems.filter((id) => id !== item.id);
    btn.textContent = "🤍";
    btn.classList.remove("liked");
    count--;
  } else {
    likedItems.push(item.id);
    btn.textContent = "❤️";
    btn.classList.add("liked");
    count++;
    btn.style.transform = "scale(1.4)";
    setTimeout(() => (btn.style.transform = ""), 300);
  }
  countEl.textContent = count;
  item.likes = count;
  localStorage.setItem("hotmeal_likes", JSON.stringify(likedItems));
}

// ===== MODAL =====
function openModal(item) {
  modalItem = item;
  modalQty = 1;
  document.getElementById("modalImg").src = item.img;
  document.getElementById("modalName").textContent = item.name;
  document.getElementById("modalDesc").textContent = item.desc;
  document.getElementById("modalLikes").textContent =
    `❤️ ${item.likes} people liked this`;
  document.getElementById("modalOldPrice").textContent = item.oldPrice
    ? item.oldPrice + " EGP"
    : "";
  document.getElementById("modalPrice").textContent = item.price + " EGP";
  document.getElementById("qtyVal").textContent = 1;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
  modalItem = null;
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.getElementById("qtyMinus").addEventListener("click", () => {
  if (modalQty > 1) {
    modalQty--;
    document.getElementById("qtyVal").textContent = modalQty;
  }
});
document.getElementById("qtyPlus").addEventListener("click", () => {
  modalQty++;
  document.getElementById("qtyVal").textContent = modalQty;
});

document.getElementById("modalAddBtn").addEventListener("click", () => {
  if (!modalItem) return;
  addToCart(modalItem, modalQty);
  const btn = document.getElementById("modalAddBtn");
  btn.textContent = "✓ Added!";
  btn.style.background = "#1c8a3e";
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.style.background = "";
    closeModal();
  }, 900);
});

document.getElementById("goToCartBtn").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// ===== SIDEBAR NAVIGATION =====
document.getElementById("menuNav").addEventListener("click", (e) => {
  const item = e.target.closest(".menu-nav-item");
  if (!item) return;
  document
    .querySelectorAll(".menu-nav-item")
    .forEach((i) => i.classList.remove("active"));
  item.classList.add("active");
  const cat = item.dataset.cat;
  const target = document.getElementById("sec-" + cat);
  if (target) {
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
});

// ===== SEARCH =====
document.getElementById("dishSearch").addEventListener("input", (e) => {
  renderMenu(e.target.value);
});

// ===== SCROLL SPY =====
function updateActiveNav() {
  const navItems = document.querySelectorAll(".menu-nav-item");
  const sections = document.querySelectorAll(".menu-section");
  let current = "";
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < 150) current = sec.id.replace("sec-", "");
  });
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.cat === current);
  });
}
window.addEventListener("scroll", updateActiveNav, { passive: true });

// ===== TABS (visual only) =====
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  });
}

// ===== INIT =====
renderMenu();
updateCartCount();
