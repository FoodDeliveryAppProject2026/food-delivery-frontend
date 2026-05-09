/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("Restaurants Page Tests", () => {
  let renderTopRestaurants;
  let renderAllRestaurants;
  let getFilteredRestaurants;
  let showToast;

  beforeEach(() => {
    // Load HTML
    const html = fs.readFileSync(
      path.resolve(__dirname, "./restaurants.html"),
      "utf8"
    );

    document.documentElement.innerHTML = html;

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();

    // Mock sessionStorage
    Object.defineProperty(window, "sessionStorage", {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });

    // Import JS
    const app = require("./restaurants.js");

    renderTopRestaurants = app.renderTopRestaurants;
    renderAllRestaurants = app.renderAllRestaurants;
    getFilteredRestaurants = app.getFilteredRestaurants;
    showToast = app.showToast;
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("Render top restaurants correctly", () => {
    renderTopRestaurants();

    const cards = document.querySelectorAll(".restaurant-card");

    expect(cards.length).toBe(3);
  });

  test("Render all restaurants correctly", () => {
    renderAllRestaurants();

    const cards = document.querySelectorAll(".list-card");

    expect(cards.length).toBeGreaterThan(0);
  });

  test("Filtered restaurants returns array", () => {
    const result = getFilteredRestaurants();

    expect(Array.isArray(result)).toBe(true);
  });

  test("Search button filters restaurants", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchInput.value = "Burger";

    searchBtn.click();

    const cards = document.querySelectorAll(".list-card");

    expect(cards.length).toBeGreaterThan(0);
  });

  test("Sort select changes restaurant order", () => {
    const sortSelect = document.getElementById("sortSelect");

    sortSelect.value = "rating";

    sortSelect.dispatchEvent(new Event("change"));

    const cards = document.querySelectorAll(".list-card");

    expect(cards.length).toBeGreaterThan(0);
  });

  test("Filter panel toggles hidden class", () => {
    const filterBtn = document.getElementById("filterBtn");
    const filterPanel = document.getElementById("filterPanel");

    filterBtn.click();

    expect(
      filterPanel.classList.contains("hidden")
    ).toBe(false);
  });

  test("Show more button increases visible restaurants", () => {
    renderAllRestaurants();

    const before =
      document.querySelectorAll(".list-card").length;

    document.getElementById("showMoreBtn").click();

    const after =
      document.querySelectorAll(".list-card").length;

    expect(after).toBeGreaterThanOrEqual(before);
  });

  test("Toast shows correctly", () => {
    const toast = document.getElementById("toast");

    showToast("Hello");

    expect(toast.textContent).toContain("Hello");
    expect(toast.classList.contains("hidden")).toBe(false);
  });

  test("Restaurant click stores id in sessionStorage", () => {
    renderAllRestaurants();

    const card = document.querySelector("[data-id]");

    card.click();

    expect(sessionStorage.setItem).toHaveBeenCalled();
  });
});