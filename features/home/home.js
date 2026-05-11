const login = document.getElementById("login");
const register = document.getElementById("register");
const logout = document.getElementById("logout");
const token = localStorage.getItem("token");

function updateNavAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    login.classList.add("hide");
    register.classList.add("hide");
    logout.classList.remove("hide");
  } else {
    login.classList.remove("hide");
    register.classList.remove("hide");
    logout.classList.add("hide");
  }
}

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  updateNavAuth();
});

updateNavAuth();

const reviewsData = [
  {
    text: '"Found my favourite restaurant on HotMeal. Delivered in 25 minutes."',
    name: "Ahmed, Cairo",
    avatarColor: "#CC0000",
  },
  {
    text: '"I order my groceries and lunch at the same time. So convenient."',
    name: "Mariam, Alexandria",
    avatarColor: "#F0B429",
  },
  {
    text: '"Late night cravings sorted. HotMeal never lets me down."',
    name: "Omar, Portsaid",
    avatarColor: "#F26B3A",
  },
];

/* ── RENDER REVIEWS ─────────────────────── */
function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  grid.innerHTML = reviewsData
    .map(
      (r) => `
    <div class="review-card animate-on-scroll">
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar" style="background:${r.avatarColor}"></div>
        <span class="review-name">— ${r.name}</span>
      </div>
    </div>`,
    )
    .join("");

  // Re-observe newly added cards
  observeAnimatedElements();
}

/* ── SCROLL ANIMATIONS ──────────────────── */
let observer;

function observeAnimatedElements() {
  const elements = document.querySelectorAll(
    ".animate-on-scroll:not(.observed)",
  );

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add("visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );
  }

  elements.forEach((el) => {
    el.classList.add("observed");
    observer.observe(el);
  });
}

/* ── NAV SCROLL SHRINK ──────────────────── */
function initNavScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true },
  );
}

/* ── SMOOTH ANCHOR SCROLLING ────────────── */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ── INIT ───────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderReviews();
  observeAnimatedElements();
  initNavScroll();
  initHeroSearch();
  initSmoothAnchors();
  initFeatureRipple();
  initCTAButtons();
});

// ===================== INIT =====================
renderReviews();
initNavScroll();
initSmoothAnchors();

window.renderReviews = renderReviews;
window.initNavScroll = initNavScroll;
window.initSmoothAnchors = initSmoothAnchors;

module.exports = {
  renderReviews,
  initNavScroll,
  initSmoothAnchors,
};
