// ===================== DATA =====================
const restaurants = [
  // Top rated (featured: true)
  {
    id: 1,
    name: "The Green Sprout",
    tags: ["Fresh", "Organic", "Mediterranean"],
    cuisines: ["vegan"],
    rating: 4.9,
    time: 25,
    delivery: "Free",
    deliveryCost: 0,
    featured: true,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: 2,
    name: "Roma Delights",
    tags: ["Italian", "Pizza", "Pasta"],
    cuisines: ["pizza"],
    rating: 4.8,
    time: 32,
    delivery: "Free",
    deliveryCost: 0,
    featured: true,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
  },
  {
    id: 3,
    name: "Grill Masters",
    tags: ["American", "Burgers", "Steaks"],
    cuisines: ["burgers"],
    rating: 4.7,
    time: 18,
    delivery: "Free",
    deliveryCost: 0,
    featured: true,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  // All restaurants
  {
    id: 4,
    name: "Sakura Zen Garden",
    tags: ["Sushi", "Japanese", "Bento Boxes"],
    cuisines: ["sushi"],
    rating: 4.9,
    time: 40,
    delivery: "$1.99",
    deliveryCost: 1.99,
    featured: false,
    topPick: true,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80",
  },
  {
    id: 5,
    name: "Sweet Treats Bakery",
    tags: ["Bakery", "Desserts", "Coffee"],
    cuisines: ["desserts", "coffee"],
    rating: 4.6,
    time: 22,
    delivery: "Free",
    deliveryCost: 0,
    featured: false,
    topPick: true,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  },
  {
    id: 6,
    name: "Noodle House",
    tags: ["Asian", "Noodles", "Ramen"],
    cuisines: ["noodles"],
    rating: 4.5,
    time: 28,
    delivery: "$0.99",
    deliveryCost: 0.99,
    featured: false,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
  },
  {
    id: 7,
    name: "Brew & Bite",
    tags: ["Coffee", "Cafe", "Breakfast"],
    cuisines: ["coffee"],
    rating: 4.4,
    time: 15,
    delivery: "Free",
    deliveryCost: 0,
    featured: false,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
  },
  {
    id: 8,
    name: "Burger Barn",
    tags: ["Burgers", "American", "Fast Food"],
    cuisines: ["burgers"],
    rating: 4.3,
    time: 20,
    delivery: "$1.49",
    deliveryCost: 1.49,
    featured: false,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80",
  },
  {
    id: 9,
    name: "Vegan Vibes",
    tags: ["Vegan", "Healthy", "Salads"],
    cuisines: ["vegan"],
    rating: 4.6,
    time: 35,
    delivery: "Free",
    deliveryCost: 0,
    featured: false,
    topPick: false,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
  },
  {
    id: 10,
    name: "Dessert Palace",
    tags: ["Desserts", "Cakes", "Ice Cream"],
    cuisines: ["desserts"],
    rating: 4.7,
    time: 25,
    delivery: "$0.99",
    deliveryCost: 0.99,
    featured: false,
    topPick: true,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
  },
];

// ===================== STATE =====================
let activeCuisine = "all";
let activeTimeFilter = "all";
let activeFeeFilter = "all";
let searchQuery = "";
let sortOrder = "relevance";
let visibleCount = 4;
const PAGE_SIZE = 4;

// ===================== HELPERS =====================
function getDeliveryLabel(r) {
  return r.deliveryCost === 0 ? "Free Delivery" : `${r.delivery} Delivery`;
}
function getTimeRange(t) {
  return `${t - 5}–${t + 5} min`;
}

// ===================== RENDER: TOP RESTAURANTS =====================
function renderTopRestaurants() {
  const grid = document.getElementById("topRestaurantsGrid");
  const featured = restaurants.filter((r) => r.featured);
  grid.innerHTML = featured
    .map(
      (r) => `
    <a class="restaurant-card" href="restaurant.html" data-id="${r.id}">
      <div class="card-image">
        <img src="${r.image}" alt="${r.name}" loading="lazy"/>
        <div class="delivery-badge">Free Delivery</div>
        <div class="card-badge"><i class="fa-solid fa-star"></i> ${r.rating}</div>
      </div>
      <div class="card-body">
        <h3>${r.name}</h3>
        <div class="card-tags">${r.tags.join(" • ")}</div>
        <div class="card-meta">
          <div class="card-time">
            <i class="fa-regular fa-clock"></i>
            ${getTimeRange(r.time)}
          </div>
        </div>
      </div>
    </a>
  `,
    )
    .join("");
}

// ===================== RENDER: ALL RESTAURANTS =====================
function getFilteredRestaurants() {
  let list = restaurants.filter((r) => !r.featured);

  // Cuisine filter
  if (activeCuisine !== "all") {
    list = list.filter((r) => r.cuisines.includes(activeCuisine));
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.cuisines.some((c) => c.includes(q)),
    );
  }

  // Time filter
  if (activeTimeFilter !== "all") {
    list = list.filter((r) => r.time <= parseInt(activeTimeFilter));
  }

  // Fee filter
  if (activeFeeFilter === "free") {
    list = list.filter((r) => r.deliveryCost === 0);
  } else if (activeFeeFilter === "low") {
    list = list.filter((r) => r.deliveryCost < 2);
  }

  // Sort
  if (sortOrder === "rating") list.sort((a, b) => b.rating - a.rating);
  else if (sortOrder === "time") list.sort((a, b) => a.time - b.time);
  else if (sortOrder === "delivery")
    list.sort((a, b) => a.deliveryCost - b.deliveryCost);

  return list;
}

function renderAllRestaurants() {
  const grid = document.getElementById("allRestaurantsGrid");
  const noResults = document.getElementById("noResults");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const list = getFilteredRestaurants();

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    showMoreBtn.classList.add("hidden");
    return;
  }

  noResults.classList.add("hidden");
  const visible = list.slice(0, visibleCount);

  grid.innerHTML = visible
    .map(
      (r) => `
    <a class="list-card" href="restaurant.html" data-id="${r.id}">
      <div class="list-card-image">
        <img src="${r.image}" alt="${r.name}" loading="lazy"/>
      </div>
      <div class="list-card-body">
        <div>
          ${r.topPick ? '<span class="top-pick-badge">Top Pick</span>' : ""}
          <div class="list-card-top">
            <h3>${r.name}</h3>
            <div class="list-card-rating"><i class="fa-solid fa-star"></i> ${r.rating}</div>
          </div>
          <div class="list-card-tags">${r.tags.join(" • ")}</div>
        </div>
        <div class="list-card-bottom">
          <div class="list-meta-item ${r.deliveryCost === 0 ? "free-delivery" : ""}">
            <i class="fa-solid fa-motorcycle"></i>
            ${getDeliveryLabel(r)}
          </div>
          <div class="list-meta-item">
            <i class="fa-regular fa-clock"></i>
            ${getTimeRange(r.time)}
          </div>
        </div>
      </div>
    </a>
  `,
    )
    .join("");

  // Show/hide "Show More" button
  if (visibleCount >= list.length) {
    showMoreBtn.classList.add("hidden");
  } else {
    showMoreBtn.classList.remove("hidden");
  }
}

// ===================== RENDER ALL =====================
function renderAll() {
  renderTopRestaurants();
  renderAllRestaurants();
}

// ===================== CUISINE FILTER =====================
document.querySelectorAll(".cuisine-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document
      .querySelectorAll(".cuisine-chip")
      .forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeCuisine = chip.dataset.cuisine;
    visibleCount = PAGE_SIZE;
    renderAllRestaurants();
    // Scroll to all restaurants
    document
      .getElementById("allRestaurantsSection")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// View all cuisines
document.getElementById("viewAllCuisines").addEventListener("click", (e) => {
  e.preventDefault();
  // Expand hidden chips if any
  showToast("Showing all cuisines!");
});

// ===================== SEARCH =====================
document.getElementById("searchBtn").addEventListener("click", () => {
  searchQuery = document.getElementById("searchInput").value;
  visibleCount = PAGE_SIZE;
  renderAllRestaurants();
  document
    .getElementById("allRestaurantsSection")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchQuery = e.target.value;
    visibleCount = PAGE_SIZE;
    renderAllRestaurants();
    document
      .getElementById("allRestaurantsSection")
      .scrollIntoView({ behavior: "smooth" });
  }
});

// Clear search on empty
document.getElementById("searchInput").addEventListener("input", (e) => {
  if (e.target.value === "") {
    searchQuery = "";
    visibleCount = PAGE_SIZE;
    renderAllRestaurants();
  }
});

// ===================== SORT =====================
document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortOrder = e.target.value;
  visibleCount = PAGE_SIZE;
  renderAllRestaurants();
});

// ===================== FILTER PANEL =====================
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");

filterBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("hidden");
  filterBtn.classList.toggle("active");
});

document.querySelectorAll(".filter-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterType = btn.dataset.filter;
    // Deactivate siblings
    document
      .querySelectorAll(`.filter-option[data-filter="${filterType}"]`)
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (filterType === "time") activeTimeFilter = btn.dataset.value;
    if (filterType === "fee") activeFeeFilter = btn.dataset.value;

    visibleCount = PAGE_SIZE;
    renderAllRestaurants();
  });
});

// ===================== SHOW MORE =====================
document.getElementById("showMoreBtn").addEventListener("click", () => {
  visibleCount += PAGE_SIZE;
  renderAllRestaurants();
});

// ===================== RESTAURANT CARD CLICK =====================
// (Cards are <a> tags pointing to restaurant.html — fully clickable, no JS needed)
// Optional: store clicked restaurant id in sessionStorage
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-id]");
  if (card) {
    sessionStorage.setItem("selectedRestaurantId", card.dataset.id);
  }
});

// ===================== TOAST =====================
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  // Trigger show animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
  });
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 350);
  }, 2400);
}

// ===================== INIT =====================
renderAll();

module.exports = {
  renderTopRestaurants,
  renderAllRestaurants,
  getFilteredRestaurants,
  showToast,
};