/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "./orders.html"),
  "utf8",
);

describe("Sidebar Menu Test", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    jest.resetModules();

    require("./orders.js");
  });

  it("Should toggle sidebar and overlay when menu button is clicked.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(overlay.classList.contains("show")).toBe(false);

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(overlay.classList.contains("show")).toBe(true);

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(overlay.classList.contains("show")).toBe(false);
  });

  it("Should close sidebar when overlay is clicked.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(overlay.classList.contains("show")).toBe(true);

    overlay.click();

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(overlay.classList.contains("show")).toBe(false);
  });
});