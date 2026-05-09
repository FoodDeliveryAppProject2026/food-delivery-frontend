/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
    <div id="reviewsGrid"></div>

    <nav id="navbar"></nav>

    <a href="#section1">Go</a>

    <div id="section1"></div>
`;

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

require("../js/home.js");

describe("Home Page Tests", () => {

    test("Render Reviews Correctly", () => {

        window.renderReviews();

        const cards =
            document.querySelectorAll(".review-card");

        expect(cards.length).toBe(3);
    });

    test("Navbar Scroll Effect", () => {

        window.initNavScroll();

        Object.defineProperty(window, "scrollY", {
            value: 100,
            writable: true,
        });

        window.dispatchEvent(new Event("scroll"));

        expect(
            document
                .getElementById("navbar")
                .classList
                .contains("scrolled")
        ).toBe(true);
    });

    test("Smooth Anchor Click", () => {

        const target =
            document.getElementById("section1");

        target.scrollIntoView = jest.fn();

        window.initSmoothAnchors();

        document
            .querySelector('a[href="#section1"]')
            .click();

        expect(target.scrollIntoView)
            .toHaveBeenCalled();
    });

    test("Animation Observer Adds Visible Class", () => {

        window.renderReviews();

        const card =
            document.querySelector(".review-card");

        expect(
            card.classList.contains("visible")
        ).toBe(true);
    });

});