import { describe, it, expect, beforeEach, vi } from "vitest";

let isEmailValid;
let showFieldError;
let hideFieldError

beforeEach(async () => {
  // ✅ important: reset module cache so DOM variables inside login.js re-bind correctly
  vi.resetModules();

  // ✅ create DOM before importing login.js
  document.body.innerHTML = `
    <form id="loginForm"></form>
    <input id="email" />
    <input id="password" />
    <button id="continueBtn"></button>
    <span id="btnLabel"></span>
    <div id="btnSpinner"></div>
    <button id="eyeToggle"></button>
    <input id="remember" />
    <button id="googleBtn"></button>
    <div id="emailError"></div>
    <div id="passwordError"></div>
  `;

  const module = await import("../login.js");
  isEmailValid = module.isEmailValid;
  showFieldError = module.showFieldError;
  hideFieldError = module.hideFieldError;
});

describe("Email Validation", () => {
  it("valid email 1", () => {
    expect(isEmailValid("omarjojo2005@gmail.com")).toBe(true);
  });

  it("valid email 2", () => {
    expect(isEmailValid("omarjojo.2005@gmail.com")).toBe(true);
  });

  it("invalid email missing @", () => {
    expect(isEmailValid("omarjojo2005gmail.com")).toBe(false);
  });

  it("invalid email missing domain", () => {
    expect(isEmailValid("omar@")).toBe(false);
  });
});

describe("showFieldError", () => {
  it("shows email error correctly", () => {
    showFieldError("email", "Invalid email");

    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");

    expect(emailError.textContent).toBe("Invalid email");
    expect(emailError.classList.contains("show")).toBe(true);
    expect(emailInput.classList.contains("error")).toBe(true);
  });

  it("shows password error correctly", () => {
    showFieldError("password", "Password too short");

    const passwordError = document.getElementById("passwordError");
    const passInput = document.getElementById("password");

    expect(passwordError.textContent).toBe("Password too short");
    expect(passwordError.classList.contains("show")).toBe(true);
    expect(passInput.classList.contains("error")).toBe(true);
  });
});


// Testing hideFieldError


describe("hideFieldError", () => {
  it("hides email error correctly", () => {
    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");

    emailError.textContent = "Invalid email";
    emailError.classList.add("show");
    emailInput.classList.add("error");

    hideFieldError("email");

    expect(emailError.textContent).toBe("");
    expect(emailError.classList.contains("show")).toBe(false);
    expect(emailInput.classList.contains("error")).toBe(false);
  });

  it("hides password error correctly", () => {
    const passwordError = document.getElementById("passwordError");
    const passInput = document.getElementById("password");

    passwordError.textContent = "Password too short";
    passwordError.classList.add("show");
    passInput.classList.add("error");

    hideFieldError("password");

    expect(passwordError.textContent).toBe("");
    expect(passwordError.classList.contains("show")).toBe(false);
    expect(passInput.classList.contains("error")).toBe(false);
  });
});


// testing 


describe('hideFieldError', () => {

  it('removes email error state', () => {
    const emailError = document.getElementById('emailError');
    const emailInput = document.getElementById('email');

    // Arrange
    emailError.classList.add('show');
    emailError.textContent = 'Invalid email';
    emailInput.classList.add('error');

    // Act
    hideFieldError('email');

    // Assert
    expect(emailError.classList.contains('show')).toBe(false);
    expect(emailError.textContent).toBe('');
    expect(emailInput.classList.contains('error')).toBe(false);
  });

  it('removes password error state', () => {
    const passwordError = document.getElementById('passwordError');
    const passInput = document.getElementById('password');

    passwordError.classList.add('show');
    passwordError.textContent = 'Wrong password';
    passInput.classList.add('error');

    hideFieldError('password');

    expect(passwordError.classList.contains('show')).toBe(false);
    expect(passwordError.textContent).toBe('');
    expect(passInput.classList.contains('error')).toBe(false);
  });

});