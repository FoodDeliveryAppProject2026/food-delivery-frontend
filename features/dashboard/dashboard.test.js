/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "./dashboard.html"),
  "utf8",
);

describe("Sidebar Menu Test", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    jest.resetModules();

    require("./dashboard.js");
  });

  it("Should toggle sidebar and overlay when menu button is clicked.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(sidebarOverlay.classList.contains("show")).toBe(false);

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(sidebarOverlay.classList.contains("show")).toBe(true);

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(sidebarOverlay.classList.contains("show")).toBe(false);
  });

  it("Should close sidebar when overlay is clicked.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(sidebarOverlay.classList.contains("show")).toBe(true);

    sidebarOverlay.click();

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(sidebarOverlay.classList.contains("show")).toBe(false);
  });

  it("Should remove sidebar classes when window width is greater than 992.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    menuBtn.click();

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(sidebarOverlay.classList.contains("show")).toBe(true);

    global.innerWidth = 1200;

    window.dispatchEvent(new Event("resize"));

    expect(sidebar.classList.contains("show")).toBe(false);
    expect(sidebarOverlay.classList.contains("show")).toBe(false);
  });

  it("Should keep sidebar open when window width is less than or equal to 992.", () => {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    menuBtn.click();

    global.innerWidth = 900;

    window.dispatchEvent(new Event("resize"));

    expect(sidebar.classList.contains("show")).toBe(true);
    expect(sidebarOverlay.classList.contains("show")).toBe(true);
  });
});