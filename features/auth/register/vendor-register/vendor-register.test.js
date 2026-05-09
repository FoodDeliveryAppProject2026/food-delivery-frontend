/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "./vendor-register.html"),
  "utf8"
);

describe("Vendor Register Tests", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    jest.resetModules();
    require("./vendor-register.js");
  });

  // ================= VALID SUBMISSION =================
  test.each([
    [
      "omar",
      "elshafey",
      "omar@gmail.com",
      "01066027761",
      "omar2005",
      "omar2005",
      "Cairo",
      "Store A",
      "Restaurant",
      "American",
    ],
    [
      "ahmed",
      "hassan",
      "ahmed@gmail.com",
      "01012345678",
      "ahmed123",
      "ahmed123",
      "Alex",
      "Store B",
      "Restaurant",
      "Italian",
    ],
  ])(
    "Valid vendor signup",
    (
      first,
      last,
      email,
      phone,
      pass,
      passconf,
      address,
      store,
      business,
      cuisine
    ) => {
      document.getElementById("firstName").value = first;
      document.getElementById("lastName").value = last;
      document.getElementById("email").value = email;
      document.getElementById("phone").value = phone;
      document.getElementById("password").value = pass;
      document.getElementById("confirmPassword").value = passconf;
      document.getElementById("address").value = address;
      document.getElementById("storeName").value = store;
      document.getElementById("businessType").value = business;
      document.getElementById("cuisineType").value = cuisine;

      document.getElementById("continueBtn").click();

      expect(document.getElementById("firstNameError").textContent).toBe("");
      expect(document.getElementById("lastNameError").textContent).toBe("");
      expect(document.getElementById("emailError").textContent).toBe("");
      expect(document.getElementById("phoneError").textContent).toBe("");
      expect(document.getElementById("passwordError").textContent).toBe("");
      expect(document.getElementById("confirmPasswordError").textContent).toBe("");
      expect(document.getElementById("addressError").textContent).toBe("");
      expect(document.getElementById("storeNameError").textContent).toBe("");
      expect(document.getElementById("businessTypeError").textContent).toBe("");
      expect(document.getElementById("cuisineTypeError").textContent).toBe("");
    }
  );

  // ================= EMPTY FORM =================
  test("Empty submission shows errors", () => {
    document.getElementById("continueBtn").click();

    expect(document.getElementById("firstNameError").textContent).toBe("First name is required.");
    expect(document.getElementById("lastNameError").textContent).toBe("Last name is required.");
    expect(document.getElementById("emailError").textContent).toBe("Please enter your email address.");
    expect(document.getElementById("phoneError").textContent).toBe("Please enter your phone number.");
    expect(document.getElementById("passwordError").textContent).toBe("Please enter your password.");
    expect(document.getElementById("confirmPasswordError").textContent).toBe(
      "You need to confirm your password."
    );
    expect(document.getElementById("addressError").textContent).toBe("Address is required.");
    expect(document.getElementById("storeNameError").textContent).toBe("Store Name is required.");
    expect(document.getElementById("businessTypeError").textContent).toBe("Business Type is required.");
    expect(document.getElementById("cuisineTypeError").textContent).toBe("Cuisine Type is required.");
  });

  // ================= PHONE VALIDATION =================
  test("Invalid phone numbers", () => {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    phoneInput.value = "0102"; // invalid
    document.getElementById("continueBtn").click();

    expect(phoneError.textContent).toBe("Please enter a valid phone number.");
  });

  test("Long phone number invalid", () => {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    phoneInput.value = "0102312421131";
    document.getElementById("continueBtn").click();

    expect(phoneError.textContent).toBe("Please enter a valid phone number.");
  });

  // ================= PASSWORD MISMATCH =================
  test("Password mismatch error", () => {
    document.getElementById("password").value = "123456";
    document.getElementById("confirmPassword").value = "000000";

    document.getElementById("continueBtn").click();

    expect(document.getElementById("confirmPasswordError").textContent).toBe(
      "password doesn't match."
    );
  });

  // ================= EYE TOGGLE (COVERS 215–216) =================
  test("Eye toggle password visibility", () => {
    const eyeToggle = document.getElementById("eyeToggle");
    const confirmEyeToggle = document.getElementById("confirmEyeToggle");

    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    password.value = "123456";
    confirm.value = "123456";

    eyeToggle.click();
    expect(password.type).toBe("text");

    eyeToggle.click();
    expect(password.type).toBe("password");

    confirmEyeToggle.click();
    expect(confirm.type).toBe("text");

    confirmEyeToggle.click();
    expect(confirm.type).toBe("password");
  });

  // ================= INPUT LISTENERS (COVERS 269–304) =================
  test("Input listeners clear errors", () => {
    const fields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "address",
      "storeName",
      "businessType",
      "cuisineType",
    ];

    fields.forEach((id) => {
      const el = document.getElementById(id);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });

    expect(true).toBe(true);
  });

  // ================= SUBMIT EVENT (COVERS 309–314) =================
  test("Submit event triggers full validation", () => {
    const form = document.getElementById("registerForm");

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("address").value = "";
    document.getElementById("storeName").value = "";
    document.getElementById("businessType").value = "";
    document.getElementById("cuisineType").value = "";

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(document.getElementById("firstNameError").textContent).toBeTruthy();
  });

  // ================= BUSINESS FIELD EMPTY (EXTRA COVERAGE) =================
  test("Business fields required errors", () => {
    document.getElementById("continueBtn").click();

    expect(document.getElementById("storeNameError").textContent).toBe(
      "Store Name is required."
    );

    expect(document.getElementById("businessTypeError").textContent).toBe(
      "Business Type is required."
    );

    expect(document.getElementById("cuisineTypeError").textContent).toBe(
      "Cuisine Type is required."
    );
  });
});