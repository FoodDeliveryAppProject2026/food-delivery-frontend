/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "./forgot-password.html"),
  "utf8"
);

describe("Forgot Password Form Test", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    jest.resetModules();
    require("./forgot-password.js");
  });

  test.each([
    ["example123@gmail.com"],
    ["omarhisham@outlook.com"],
  ])("Valid Email Submission", (email) => {
    const continueBtn = document.getElementById("continueBtn");

    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    emailField.value = email;

    continueBtn.click();

    expect(emailError.textContent).toBe("");
  });

  test("Should Return Error On Empty Submission", () => {
    const continueBtn = document.getElementById("continueBtn");

    const emailError = document.getElementById("emailError");

    continueBtn.click();

    expect(emailError.textContent).toBe(
      "Please enter your email address."
    );
  });

  test.each([
    ["omar"],
    ["omar@gmail"],
    ["@gmail.com"],
    ["omar.com"],
  ])("Invalid Email Format", (email) => {
    const continueBtn = document.getElementById("continueBtn");

    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    emailField.value = email;

    continueBtn.click();

    expect(emailError.textContent).toBe(
      "Please enter a valid email address."
    );
  });

  test("Should Clear Email Error While Typing", () => {
    const continueBtn = document.getElementById("continueBtn");

    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    continueBtn.click();

    expect(emailError.textContent).toBe(
      "Please enter your email address."
    );

    emailField.value = "omar@gmail.com";

    emailField.dispatchEvent(new Event("input"));

    expect(emailError.textContent).toBe("");
  });

  test("Loading State Test", () => {
    const continueBtn = document.getElementById("continueBtn");

    continueBtn.classList.add("loading");
    continueBtn.disabled = true;

    expect(continueBtn.disabled).toBe(true);
    expect(continueBtn.classList.contains("loading")).toBe(true);

    continueBtn.classList.remove("loading");
    continueBtn.disabled = false;

    expect(continueBtn.disabled).toBe(false);
    expect(continueBtn.classList.contains("loading")).toBe(false);
  });
});