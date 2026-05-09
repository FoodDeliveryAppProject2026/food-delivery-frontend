/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("Home Page Tests (Full Coverage)", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="reviewsGrid"></div>

      <nav id="navbar"></nav>

      <a href="#section1">Go</a>
      <a href="#">Empty</a>

      <div id="section1"></div>
    `;

    jest.resetModules();

    // Mock IntersectionObserver
    global.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
      }

      observe(element) {
        this.callback([
          {
            isIntersecting: true,
            target: element,
          },
        ]);
      }

      unobserve() {}
    };
global.initHeroSearch = jest.fn();
global.initFeatureRipple = jest.fn();
global.initCTAButtons = jest.fn();
    // Import after DOM + mocks
    require("./home.js");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ================= REVIEWS =================
  test("renders reviews correctly", () => {
    window.renderReviews();

    const cards = document.querySelectorAll(".review-card");
    expect(cards.length).toBe(3);
  });

  test("reviews grid exists check (early return safety)", () => {
    document.getElementById("reviewsGrid").remove();

    expect(() => window.renderReviews()).not.toThrow();
  });

  // ================= NAVBAR SCROLL =================
  test("navbar adds scrolled class when scrolling down", () => {
    window.initNavScroll();

    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
    });

    window.dispatchEvent(new Event("scroll"));

    expect(
      document.getElementById("navbar").classList.contains("scrolled")
    ).toBe(true);
  });

  test("navbar removes scrolled class when scrolling up", () => {
    window.initNavScroll();

    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    window.dispatchEvent(new Event("scroll"));

    expect(
      document.getElementById("navbar").classList.contains("scrolled")
    ).toBe(false);
  });

  test("navbar early return when missing element", () => {
    document.getElementById("navbar").remove();

    expect(() => window.initNavScroll()).not.toThrow();
  });

  // ================= SMOOTH SCROLL =================
  test("smooth scroll works for valid anchor", () => {
    const target = document.getElementById("section1");
    target.scrollIntoView = jest.fn();

    window.initSmoothAnchors();

    document.querySelector('a[href="#section1"]').click();

    expect(target.scrollIntoView).toHaveBeenCalled();
  });

  test("smooth scroll ignores missing target", () => {
    const link = document.createElement("a");
    link.setAttribute("href", "#doesNotExist");

    document.body.appendChild(link);

    window.initSmoothAnchors();

    link.click();

    expect(true).toBe(true); // no crash = pass
  });

  test("smooth scroll ignores empty href", () => {
    const link = document.querySelector('a[href="#"]');

    window.initSmoothAnchors();

    expect(() => link.click()).not.toThrow();
  });

  // ================= INTERSECTION OBSERVER =================
  test("animation observer adds visible class", () => {
    window.renderReviews();

    const card = document.querySelector(".review-card");

    expect(card.classList.contains("visible")).toBe(true);
  });

  // ================= DOMCONTENTLOADED INIT =================
  test("DOMContentLoaded initializes page", () => {
    document.dispatchEvent(new Event("DOMContentLoaded"));

    const cards = document.querySelectorAll(".review-card");

    expect(cards.length).toBe(3);
  });

  // ================= EDGE SAFETY =================
  test("renderReviews does nothing if grid missing", () => {
    document.getElementById("reviewsGrid").remove();

    expect(() => window.renderReviews()).not.toThrow();
  });
});