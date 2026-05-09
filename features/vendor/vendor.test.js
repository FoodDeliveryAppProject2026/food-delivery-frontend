
/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "./vendor.html"),
  "utf8",
);

describe("Vendor Tests", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    localStorage.clear();

    jest.resetModules();

    require("./vendor.js");
  });

  it("Should render menu sections.", () => {
    const sections = document.querySelectorAll(".menu-section");

    expect(sections.length).toBeGreaterThan(0);
  });

  it("Should add item to cart when add button is clicked.", () => {
    const addBtn = document.querySelector(".add-btn");

    addBtn.click();

    const cart = JSON.parse(localStorage.getItem("hotmeal_cart"));

    expect(cart.length).toBe(1);
    expect(cart[0].qty).toBe(1);
  });

  it("Should update cart count after adding item.", () => {
    const addBtn = document.querySelector(".add-btn");
    const cartCount = document.getElementById("cartCount");

    addBtn.click();

    expect(cartCount.textContent).toBe("1");
  });

  it("Should like and unlike item correctly.", () => {
    const likeBtn = document.querySelector(".like-btn");

    expect(likeBtn.classList.contains("liked")).toBe(false);

    likeBtn.click();

    expect(likeBtn.classList.contains("liked")).toBe(true);
    expect(likeBtn.textContent.trim()).toBe("❤️");

    likeBtn.click();

    expect(likeBtn.classList.contains("liked")).toBe(false);
    expect(likeBtn.textContent.trim()).toBe("🤍");
  });

  it("Should open modal when clicking item card.", () => {
    const itemCard = document.querySelector(".item-card");
    const modal = document.getElementById("modalOverlay");

    itemCard.click();

    expect(modal.classList.contains("open")).toBe(true);
  });

  it("Should close modal when clicking close button.", () => {
    const itemCard = document.querySelector(".item-card");
    const closeBtn = document.getElementById("modalClose");
    const modal = document.getElementById("modalOverlay");

    itemCard.click();

    expect(modal.classList.contains("open")).toBe(true);

    closeBtn.click();

    expect(modal.classList.contains("open")).toBe(false);
  });

  it("Should increase quantity in modal.", () => {
    const itemCard = document.querySelector(".item-card");
    const plusBtn = document.getElementById("qtyPlus");
    const qtyVal = document.getElementById("qtyVal");

    itemCard.click();

    plusBtn.click();

    expect(qtyVal.textContent).toBe("2");
  });

  it("Should not decrease quantity below 1.", () => {
    const itemCard = document.querySelector(".item-card");
    const minusBtn = document.getElementById("qtyMinus");
    const qtyVal = document.getElementById("qtyVal");

    itemCard.click();

    minusBtn.click();

    expect(qtyVal.textContent).toBe("1");
  });

  it("Should filter menu items using search.", () => {
    const searchInput = document.getElementById("dishSearch");

    searchInput.value = "Nacho";
    searchInput.dispatchEvent(new Event("input"));

    const items = document.querySelectorAll(".item-card");

    expect(items.length).toBeGreaterThan(0);
  });

  it("Should activate clicked tab.", () => {
    const tabs = document.querySelectorAll(".tab");

    if (tabs.length > 1) {
      tabs[1].click();

      expect(tabs[1].classList.contains("active")).toBe(true);
    }
  });

  it("Should save likes in localStorage.", () => {
    const likeBtn = document.querySelector(".like-btn");

    likeBtn.click();

    const likes = JSON.parse(localStorage.getItem("hotmeal_likes"));

    expect(likes.length).toBe(1);
  });

  it("Should add modal quantity to cart.", () => {
    const itemCard = document.querySelector(".item-card");
    const plusBtn = document.getElementById("qtyPlus");
    const modalAddBtn = document.getElementById("modalAddBtn");

    itemCard.click();

    plusBtn.click();
    plusBtn.click();

    modalAddBtn.click();

    const cart = JSON.parse(localStorage.getItem("hotmeal_cart"));

    expect(cart[0].qty).toBe(3);
  });
  it("Should close modal when clicking overlay background.", () => {
    const itemCard = document.querySelector(".item-card");
    const modal = document.getElementById("modalOverlay");

    itemCard.click();

    modal.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(modal.classList.contains("open")).toBe(false);
  });

 it("Should update active navigation item on scroll.", () => {
  const sections = document.querySelectorAll(".menu-section");
  const navItems = document.querySelectorAll(".menu-nav-item");

  sections.forEach((section, index) => {
    section.getBoundingClientRect = jest.fn(() => ({
      top: index === 0 ? 100 : 300,
    }));
  });

  window.dispatchEvent(new Event("scroll"));

  expect(navItems[0].classList.contains("active")).toBe(true);
});

  it("Should navigate to section when nav item is clicked.", () => {
    const navItem = document.querySelector(".menu-nav-item");

    window.scrollTo = jest.fn();

    if (navItem) {
      navItem.click();

      expect(window.scrollTo).toHaveBeenCalled();
    }
  });

it("Should redirect to cart page when cart button is clicked.", () => {
  delete window.location;

  window.location = {
    href: "",
  };

  const cartBtn = document.getElementById("goToCartBtn");
  cartBtn.click();

  expect(window.location.href).toBe("./cart/cart.html");
});
  it("Should animate add button after clicking.", () => {
    jest.useFakeTimers();

    const addBtn = document.querySelector(".add-btn");

    addBtn.click();

    expect(addBtn.textContent).toBe("✓");

    jest.advanceTimersByTime(700);

    expect(addBtn.textContent).toBe("+");

    jest.useRealTimers();
  });

  it("Should reset modal add button after timeout.", () => {
    jest.useFakeTimers();

    const itemCard = document.querySelector(".item-card");
    const modalAddBtn = document.getElementById("modalAddBtn");

    itemCard.click();

    modalAddBtn.click();

    expect(modalAddBtn.textContent).toBe("✓ Added!");

    jest.advanceTimersByTime(900);

    expect(modalAddBtn.textContent).toBe("Add to Cart");

    jest.useRealTimers();
  });

  it("Should store cart in localStorage.", () => {
    const addBtn = document.querySelector(".add-btn");

    addBtn.click();

    expect(localStorage.getItem("hotmeal_cart")).not.toBeNull();
  });

  it("Should render filtered search results correctly.", () => {
    const searchInput = document.getElementById("dishSearch");

    searchInput.value = "zzzz";
    searchInput.dispatchEvent(new Event("input"));

    const items = document.querySelectorAll(".item-card");

    expect(items.length).toBe(0);
  });
});
