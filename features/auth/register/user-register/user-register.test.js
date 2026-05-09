/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../pages/user-register.html"),
  "utf8",
);

describe("User Sign Up Test", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    jest.resetModules();
    require("../js/user-register.js");
  });
  test.each([
    [
      "example",
      "test",
      "example123@outlook.com",
      "asdasd_21332",
      "01066027761",
    ],
    ["omar", "hisham", "omarhisham@gmail.com", "omar2005", "01235423243"],
  ])("valid signup data", (first, last, email, password, phone) => {
    const continuebutton = document.getElementById("continueBtn");

    const passwordError = document.getElementById("passwordError");
    const passwordField = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const emailField = document.getElementById("email");

    const firstNameInput = document.getElementById("firstName");
    const firstNameError = document.getElementById("firstNameError");

    const lastNameInput = document.getElementById("lastName");
    const lastNameError = document.getElementById("lastNameError");

    const confirmPasswordError = document.getElementById(
      "confirmPasswordError",
    );
    const confirmpassInput = document.getElementById("confirmPassword");

    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    firstNameInput.value = first;
    lastNameInput.value = last;
    emailField.value = email;
    passwordField.value = password;
    confirmpassInput.value = password;
    phoneInput.value = phone;
    continuebutton.click();
    expect(firstNameError.textContent).toBe("");
    expect(lastNameError.textContent).toBe("");
    expect(emailError.textContent).toBe("");
    expect(passwordError.textContent).toBe("");
    expect(confirmPasswordError.textContent).toBe("");
    expect(phoneError.textContent).toBe("");
  });

  test("Should Return Error On Empty Submissions", () => {
    const continuebutton = document.getElementById("continueBtn");

    const passwordError = document.getElementById("passwordError");
    const emailError = document.getElementById("emailError");
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError",
    );
    const phoneError = document.getElementById("phoneError");

    continuebutton.click();

    expect(firstNameError.textContent).toBe("First name is required.");
    expect(lastNameError.textContent).toBe("Last name is required.");
    expect(emailError.textContent).toBe("Please enter your email address.");
    expect(passwordError.textContent).toBe("Please enter your password.");
    expect(confirmPasswordError.textContent).toBe(
      "You need to confirm your password.",
    );
    expect(phoneError.textContent).toBe("Please enter your phone number.");
  });

  test.each([
    [
      "example",
      "test",
      "example123@outlook.com",
      "asdasd_21332",
      "omar",
      "01066027761",
    ],
    [
      "omar",
      "hisham",
      "omarhisham@gmail.com",
      "omar2005",
      "omar",
      "01066027761",
    ],
  ])(
    "Putting an unmatched passwords",
    (first, last, email, password, password2, phone) => {
      const continuebutton = document.getElementById("continueBtn");

      const passwordError = document.getElementById("passwordError");
      const passwordField = document.getElementById("password");

      const emailError = document.getElementById("emailError");
      const emailField = document.getElementById("email");

      const firstNameInput = document.getElementById("firstName");
      const firstNameError = document.getElementById("firstNameError");

      const lastNameInput = document.getElementById("lastName");
      const lastNameError = document.getElementById("lastNameError");

      const confirmPasswordError = document.getElementById(
        "confirmPasswordError",
      );
      const confirmpassInput = document.getElementById("confirmPassword");

      const phoneInput = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");

      firstNameInput.value = first;
      lastNameInput.value = last;
      emailField.value = email;
      passwordField.value = password;
      confirmpassInput.value = password2;
      phoneInput.value = phone;

      continuebutton.click();

      expect(firstNameError.textContent).toBe("");
      expect(lastNameError.textContent).toBe("");
      expect(emailError.textContent).toBe("");
      expect(passwordError.textContent).toBe("");
      expect(phoneError.textContent).toBe("");
      expect(confirmPasswordError.textContent).toBe("password doesn't match.");
    },
  );
  test.each([
    ["example", "test", "example123@outlook.com", "asdasd_21332", "010660"],
    ["omar", "hisham", "omarhisham@gmail.com", "omar2005", "01235"],
  ])(
    "Phone Number Smaller Than 11 Numbers",
    (first, last, email, password, phone) => {
      const continuebutton = document.getElementById("continueBtn");

      const passwordError = document.getElementById("passwordError");
      const passwordField = document.getElementById("password");

      const emailError = document.getElementById("emailError");
      const emailField = document.getElementById("email");

      const firstNameInput = document.getElementById("firstName");
      const firstNameError = document.getElementById("firstNameError");

      const lastNameInput = document.getElementById("lastName");
      const lastNameError = document.getElementById("lastNameError");

      const confirmPasswordError = document.getElementById(
        "confirmPasswordError",
      );
      const confirmpassInput = document.getElementById("confirmPassword");

      const phoneInput = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");

      firstNameInput.value = first;
      lastNameInput.value = last;
      emailField.value = email;
      passwordField.value = password;
      confirmpassInput.value = password;
      phoneInput.value = phone;
      continuebutton.click();
      expect(firstNameError.textContent).toBe("");
      expect(lastNameError.textContent).toBe("");
      expect(emailError.textContent).toBe("");
      expect(passwordError.textContent).toBe("");
      expect(confirmPasswordError.textContent).toBe("");
      expect(phoneError.textContent).toBe("Please enter a valid phone number.");
    },
  );
  test.each([
    [
      "example",
      "test",
      "example123@outlook.com",
      "asdasd_21332",
      "0106612421410",
    ],
    ["omar", "hisham", "omarhisham@gmail.com", "omar2005", "0123214124215"],
  ])(
    "Phone Number Longer Than 11 Numbers",
    (first, last, email, password, phone) => {
      const continuebutton = document.getElementById("continueBtn");

      const passwordError = document.getElementById("passwordError");
      const passwordField = document.getElementById("password");

      const emailError = document.getElementById("emailError");
      const emailField = document.getElementById("email");

      const firstNameInput = document.getElementById("firstName");
      const firstNameError = document.getElementById("firstNameError");

      const lastNameInput = document.getElementById("lastName");
      const lastNameError = document.getElementById("lastNameError");

      const confirmPasswordError = document.getElementById(
        "confirmPasswordError",
      );
      const confirmpassInput = document.getElementById("confirmPassword");

      const phoneInput = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");

      firstNameInput.value = first;
      lastNameInput.value = last;
      emailField.value = email;
      passwordField.value = password;
      confirmpassInput.value = password;
      phoneInput.value = phone;
      continuebutton.click();
      expect(firstNameError.textContent).toBe("");
      expect(lastNameError.textContent).toBe("");
      expect(emailError.textContent).toBe("");
      expect(passwordError.textContent).toBe("");
      expect(confirmPasswordError.textContent).toBe("");
      expect(phoneError.textContent).toBe("Please enter a valid phone number.");
    },
  );

  test("Toggeling the Eye click", () => {
    const eyeToggle = document.getElementById("eyeToggle");
    const confirmEyeToggle = document.getElementById("confirmEyeToggle");
    const passwordField = document.getElementById("password");
    const confirmpassInput = document.getElementById("confirmPassword");
    const password = "omar";
    passwordField.value = password;
    confirmpassInput.value = password;

    eyeToggle.click();
    expect(passwordField.type).toBe("text");

    eyeToggle.click();
    expect(passwordField.type).toBe("password");

    confirmEyeToggle.click();
    expect(confirmpassInput.type).toBe("text");

    confirmEyeToggle.click();
    expect(confirmpassInput.type).toBe("password");
  });
});
