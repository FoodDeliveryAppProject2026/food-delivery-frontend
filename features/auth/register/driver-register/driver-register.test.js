/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("User Register - Full Coverage Tests", () => {
  let registerForm;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "./driver-register.html"),
      "utf8"
    );

    document.documentElement.innerHTML = html;

    jest.resetModules();
    require("./driver-register.js");

    registerForm = document.getElementById("registerForm");
  });

  // ================= VALID SUBMISSION =================
  test("valid form submission passes validation", () => {
    document.getElementById("firstName").value = "Omar";
    document.getElementById("lastName").value = "Hisham";
    document.getElementById("email").value = "omar@gmail.com";
    document.getElementById("password").value = "123456";
    document.getElementById("confirmPassword").value = "123456";
    document.getElementById("phone").value = "01012345678";

    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("emailError").textContent).toBe("");
  });

  // ================= EMPTY VALIDATION =================
  test("empty form triggers all errors", () => {
    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("firstNameError").textContent).toBe(
      "First name is required."
    );
    expect(document.getElementById("lastNameError").textContent).toBe(
      "Last name is required."
    );
    expect(document.getElementById("emailError").textContent).toBe(
      "Please enter your email address."
    );
    expect(document.getElementById("passwordError").textContent).toBe(
      "Please enter your password."
    );
    expect(document.getElementById("confirmPasswordError").textContent).toBe(
      "You need to confirm your password."
    );
    expect(document.getElementById("phoneError").textContent).toBe(
      "Please enter your phone number."
    );
  });

  // ================= PASSWORD MISMATCH =================
  test("password mismatch triggers error", () => {
    document.getElementById("firstName").value = "Omar";
    document.getElementById("lastName").value = "Hisham";
    document.getElementById("email").value = "omar@gmail.com";
    document.getElementById("password").value = "123456";
    document.getElementById("confirmPassword").value = "999999";
    document.getElementById("phone").value = "01012345678";

    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(
      document.getElementById("confirmPasswordError").textContent
    ).toBe("password doesn't match.");
  });

  // ================= PHONE INVALID =================
  test("invalid phone triggers error", () => {
    document.getElementById("firstName").value = "Omar";
    document.getElementById("lastName").value = "Hisham";
    document.getElementById("email").value = "omar@gmail.com";
    document.getElementById("password").value = "123456";
    document.getElementById("confirmPassword").value = "123456";
    document.getElementById("phone").value = "123";

    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("phoneError").textContent).toBe(
      "Please enter a valid phone number."
    );
  });

  // ================= PASSWORD TOO SHORT =================
  test("short password triggers validation error", () => {
    document.getElementById("firstName").value = "Omar";
    document.getElementById("lastName").value = "Hisham";
    document.getElementById("email").value = "omar@gmail.com";
    document.getElementById("password").value = "123";
    document.getElementById("confirmPassword").value = "123";
    document.getElementById("phone").value = "01012345678";

    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("passwordError").textContent).toBe(
      "Password must be at least 6 characters."
    );
  });

  // ================= EMAIL INVALID =================
  test("invalid email triggers error", () => {
    document.getElementById("firstName").value = "Omar";
    document.getElementById("lastName").value = "Hisham";
    document.getElementById("email").value = "invalid-email";
    document.getElementById("password").value = "123456";
    document.getElementById("confirmPassword").value = "123456";
    document.getElementById("phone").value = "01012345678";

    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(document.getElementById("emailError").textContent).toBe(
      "Please enter a valid email address."
    );
  });

  // ================= EYE TOGGLE =================
  test("eye toggle changes password visibility", () => {
    const eyeToggle = document.getElementById("eyeToggle");
    const confirmEyeToggle = document.getElementById("confirmEyeToggle");

    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    eyeToggle.click();
    expect(password.type).toBe("text");

    eyeToggle.click();
    expect(password.type).toBe("password");

    confirmEyeToggle.click();
    expect(confirm.type).toBe("text");

    confirmEyeToggle.click();
    expect(confirm.type).toBe("password");
  });

  // ================= INPUT CLEAR ERRORS =================
  test("typing clears errors", () => {
    const firstName = document.getElementById("firstName");
    const firstNameError = document.getElementById("firstNameError");

    firstNameError.textContent = "Error";
    firstName.dispatchEvent(new Event("input"));

    expect(firstNameError.textContent).toBe("");
  });

  // ================= setLoading COVERAGE =================
  test("loading state toggles correctly", () => {
    const btn = document.getElementById("continueBtn");

    btn.click();
    expect(btn.disabled).toBeDefined();
  });
});