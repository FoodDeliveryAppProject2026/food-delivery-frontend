/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../pages/vendor.html"),
  "utf8"
);

describe("Restaurant Menu Tests", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;

    jest.resetModules();

    require("../js/vendor.js");
  });

  test("Render dishes correctly", () => {
    const dishes = document.querySelectorAll(".dish-card");

    expect(dishes.length).toBeGreaterThan(0);
  });

  test("Search filters dishes", () => {
    const input = document.getElementById("searchInput");

    input.value = "ramen";

    input.dispatchEvent(new Event("input"));

    const dishes = document.querySelectorAll(".dish-card");

    expect(dishes.length).toBeGreaterThan(0);

    dishes.forEach((dish) => {
      expect(dish.textContent.toLowerCase()).toContain("ramen");
    });
  });

  test("Add to cart updates cart count", () => {
    global.addToCart(1);

    const cartCount = document.getElementById("cartCount");

    expect(cartCount.textContent).toBe("1");
  });

  test("Cart total updates correctly", () => {
    global.addToCart(1);

    const total = document.getElementById("cartTotal");

    expect(total.textContent).not.toBe("$0.00");
  });

  test("Category filter works", () => {
    const sushiBtn = document.querySelector(
      '.cat-btn[data-cat="sushi"]'
    );

    sushiBtn.click();

    const dishes = document.querySelectorAll(".dish-card");

    expect(dishes.length).toBeGreaterThan(0);
  });

  test("Filter panel toggles", () => {
    const filterBtn = document.getElementById("filterBtn");
    const panel = document.getElementById("filterPanel");

    filterBtn.click();

    expect(panel.classList.contains("open")).toBe(true);
  });

  test("Price range updates text", () => {
    const range = document.getElementById("priceRange");
    const value = document.getElementById("priceVal");

    range.value = "15";

    range.dispatchEvent(new Event("input"));

    expect(value.textContent).toBe("$15");
  });

  test("Toast appears when adding item", () => {
    global.addToCart(1);

    const toast = document.getElementById("toast");

    expect(toast.classList.contains("show")).toBe(true);
  });

  test("Cart opens correctly", () => {
    const cartBtn = document.getElementById("cartBtn");

    cartBtn.click();

    const sidebar = document.getElementById("cartSidebar");

    expect(sidebar.classList.contains("open")).toBe(true);
  });

  test("Cart closes correctly", () => {
    const cartBtn = document.getElementById("cartBtn");
    const closeBtn = document.getElementById("closeCart");

    cartBtn.click();
    closeBtn.click();

    const sidebar = document.getElementById("cartSidebar");

    expect(sidebar.classList.contains("open")).toBe(false);
  });
});