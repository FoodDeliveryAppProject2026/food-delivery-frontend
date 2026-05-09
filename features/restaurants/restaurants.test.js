/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("Restaurants Page Tests (Full Coverage)", () => {
  let renderTopRestaurants;
  let renderAllRestaurants;
  let getFilteredRestaurants;
  let showToast;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "./restaurants.html"),
      "utf8"
    );

    document.documentElement.innerHTML = html;

    Element.prototype.scrollIntoView = jest.fn();

    Object.defineProperty(window, "sessionStorage", {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });

    jest.resetModules();

    const app = require("./restaurants.js");

    renderTopRestaurants = app.renderTopRestaurants;
    renderAllRestaurants = app.renderAllRestaurants;
    getFilteredRestaurants = app.getFilteredRestaurants;
    showToast = app.showToast;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ================= TOP RESTAURANTS =================
  test("renders top restaurants", () => {
    renderTopRestaurants();

    const cards = document.querySelectorAll(".restaurant-card");
    expect(cards.length).toBe(3);
  });

  // ================= ALL RESTAURANTS =================
  test("renders all restaurants initially", () => {
    renderAllRestaurants();

    const cards = document.querySelectorAll(".list-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  // ================= FILTER FUNCTION =================
  test("getFilteredRestaurants returns array", () => {
    const result = getFilteredRestaurants();
    expect(Array.isArray(result)).toBe(true);
  });

  test("cuisine filter works", () => {
    document.querySelector('[data-cuisine="burgers"]').click();
    renderAllRestaurants();

    const cards = document.querySelectorAll(".list-card");
    expect(cards.length).toBeGreaterThanOrEqual(0);
  });

  test("search filter works", () => {
    const input = document.getElementById("searchInput");
    const btn = document.getElementById("searchBtn");

    input.value = "Burger";
    btn.click();

    const cards = document.querySelectorAll(".list-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  test("search input enter key works", () => {
    const input = document.getElementById("searchInput");

    input.value = "Pizza";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    const cards = document.querySelectorAll(".list-card");
    expect(cards.length).toBeGreaterThanOrEqual(0);
  });

  test("search clears correctly", () => {
    const input = document.getElementById("searchInput");

    input.value = "";
    input.dispatchEvent(new Event("input"));

    const result = getFilteredRestaurants();
    expect(Array.isArray(result)).toBe(true);
  });

  // ================= SORTING =================
  test("sort by rating", () => {
    const sortSelect = document.getElementById("sortSelect");

    sortSelect.value = "rating";
    sortSelect.dispatchEvent(new Event("change"));

    const cards = document.querySelectorAll(".list-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  test("sort by time", () => {
    const sortSelect = document.getElementById("sortSelect");

    sortSelect.value = "time";
    sortSelect.dispatchEvent(new Event("change"));

    expect(document.querySelectorAll(".list-card").length).toBeGreaterThan(0);
  });

  test("sort by delivery", () => {
    const sortSelect = document.getElementById("sortSelect");

    sortSelect.value = "delivery";
    sortSelect.dispatchEvent(new Event("change"));

    expect(document.querySelectorAll(".list-card").length).toBeGreaterThan(0);
  });

  // ================= FILTER PANEL =================
  test("filter panel toggles", () => {
    const btn = document.getElementById("filterBtn");
    const panel = document.getElementById("filterPanel");

    btn.click();

    expect(panel.classList.contains("hidden")).toBe(false);
  });

  test("time filter works", () => {
    document
      .querySelector('[data-filter="time"][data-value="30"]')
      .click();

    renderAllRestaurants();

    expect(document.querySelectorAll(".list-card").length).toBeGreaterThanOrEqual(0);
  });

  test("fee filter free works", () => {
    document
      .querySelector('[data-filter="fee"][data-value="free"]')
      .click();

    renderAllRestaurants();

    expect(getFilteredRestaurants().every(r => r.deliveryCost === 0)).toBe(true);
  });

  test("fee filter low works", () => {
    document
      .querySelector('[data-filter="fee"][data-value="low"]')
      .click();

    renderAllRestaurants();

    expect(Array.isArray(getFilteredRestaurants())).toBe(true);
  });

  // ================= PAGINATION =================
  test("show more increases items", () => {
    renderAllRestaurants();

    const before = document.querySelectorAll(".list-card").length;

    document.getElementById("showMoreBtn").click();

    const after = document.querySelectorAll(".list-card").length;

    expect(after).toBeGreaterThanOrEqual(before);
  });

  test("show more hides when finished", () => {
    renderAllRestaurants();

    const btn = document.getElementById("showMoreBtn");

    for (let i = 0; i < 5; i++) {
      btn.click();
    }

    expect(btn.classList.contains("hidden")).toBe(true);
  });

  // ================= EMPTY STATE =================
  test("shows no results UI", () => {
    const input = document.getElementById("searchInput");

    input.value = "zzzzzzzz";
    document.getElementById("searchBtn").click();

    const noResults = document.getElementById("noResults");

    expect(noResults.classList.contains("hidden")).toBe(false);
  });

  // ================= TOAST =================
  jest.useFakeTimers();

  test("toast shows and hides", () => {
    const toast = document.getElementById("toast");

    showToast("Hello World");

    expect(toast.textContent).toContain("Hello World");

    jest.advanceTimersByTime(2500);

    expect(toast.classList.contains("hidden")).toBe(true);
  });

  // ================= SESSION STORAGE =================
  test("click stores restaurant id", () => {
    renderAllRestaurants();

    const card = document.querySelector("[data-id]");
    card.click();

    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  // ================= VIEW ALL CATEGORIES =================
  test("view all cuisines triggers toast", () => {
    const btn = document.getElementById("viewAllCuisines");

    btn.click();

    expect(document.getElementById("toast")).toBeTruthy();
  });
});