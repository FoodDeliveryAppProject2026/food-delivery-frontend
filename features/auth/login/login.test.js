/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../pages/login.html"),
  "utf8",
);

let setLoading;
describe("Login Form Test", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    jest.resetModules();
    require("../js/login.js");
    ({ setLoading } = require("../js/login.js"));
  });

  test.each(
    [
      ["exmaple123@outlook.com", "asdasd_21332"],
      ["example2@gmail.com", "321345"],
    ],
    (email, password) => {
      const continueButton = document.getElementById("continueBtn");

      const passwordError = document.getElementById("passwordError");
      const passwordField = document.getElementById("password");

      const emailError = document.getElementById("emailError");
      const emailField = document.getElementById("email");

      emailField.value = email;
      passwordField.value = password;

      continueButton.click();

      expect(passwordError.textContent).toBe("");
      expect(emailError.textContent).toBe("");
    },
  );

  it("Should return error on empty submission.", () => {
    const continueButton = document.getElementById("continueBtn");
    const passwordError = document.getElementById("passwordError");
    const emailError = document.getElementById("emailError");

    continueButton.click();

    expect(passwordError.textContent).toBe("Please enter your password.");
    expect(emailError.textContent).toBe("Please enter your email address.");
  });

  it("Should return error if password is empty.", () => {
    const passwordError = document.getElementById("passwordError");
    const continueButton = document.getElementById("continueBtn");

    continueButton.click();

    expect(passwordError.textContent).toBe("Please enter your password.");
  });

  it("should toggle password visibility when the icon is clicked.", () => {
    const passwordField = document.getElementById("password");
    const eyeToggle = document.getElementById("eyeToggle");

    expect(passwordField.type).toBe("password");

    eyeToggle.click();
    expect(passwordField.type).toBe("text");

    eyeToggle.click();
    expect(passwordField.type).toBe("password");
  });

  it("Should disable continue button and add loaing when clicked.", () => {
    const continueButton = document.getElementById("continueBtn");

    setLoading(true);

    expect(continueButton.disabled).toBe(true);
    expect(continueButton.classList.contains("loading")).toBe(true);
  });

  it("should enable the button and remove 'loading' class when isLoading is false", () => {
    const continueButton = document.getElementById("continueBtn");

    setLoading(true);

    setLoading(false);

    expect(continueButton.disabled).toBe(false);
    expect(continueButton.classList.contains("loading")).toBe(false);
  });

  it("Should return error if email is empty.", () => {
    const emailError = document.getElementById("emailError");
    const continueButton = document.getElementById("continueBtn");

    continueButton.click();

    expect(emailError.textContent).toBe("Please enter your email address.");
  });

  it("Password should be at least 6 characters.", () => {
    const passwordField = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const continueButton = document.getElementById("continueBtn");

    passwordField.value = "123";

    continueButton.click();

    expect(passwordError.textContent).toBe(
      "Password must be at least 6 characters.",
    );
  });

  it("should display error for invalid email address.", () => {
    const emailField = document.getElementById("email");
    const continueButton = document.getElementById("continueBtn");
    const emailError = document.getElementById("emailError");

    emailField.value = "email@gmailcom";
    continueButton.click();

    expect(emailError.textContent).toBe("Please enter a valid email address.");
  });

  it("Should clear error messages when the user starts typing again.", () => {
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    const passwordField = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");

    const continueButton = document.getElementById("continueBtn");

    continueButton.click();

    expect(emailError.textContent).not.toBe("");
    expect(passwordError.textContent).not.toBe("");

    emailField.value = "a";
    emailField.dispatchEvent(new Event("input"));

    expect(emailError.textContent).toBe("");
    expect(passwordError.textContent).not.toBe("");

    passwordField.value = "p";
    passwordField.dispatchEvent(new Event("input"));

    expect(passwordError.textContent).toBe("");
  });

  it("Should Trim whitespaces from Email.", () => {
    const emailField = document.getElementById("email");
    const continueButton = document.getElementById("continueBtn");
    const emailError = document.getElementById("emailError");
    const passwordField = document.getElementById("password");

    emailField.value = "  test@example.com  ";
    passwordField.value = "CorrectPass_1";
    continueButton.click();

    expect(emailField.textContent).toBe("");
  });

  it("Should redirect to forgot password page when clicked on forget password.", () => {
    const forgetPass = document.querySelector(".forgot-link");

    expect(forgetPass.getAttribute("href")).toBe(
      "../pages/forgot-password.html",
    );
  });
});
