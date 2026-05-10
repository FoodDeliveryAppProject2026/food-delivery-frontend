// Form
const registerForm = document.getElementById("registerForm");

// Inputs
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");

// Inputs Errors
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");

// Btn
const continueBtn = document.getElementById("continueBtn");
const googleBtn = document.getElementById("googleBtn");
const remember = document.getElementById("remember");
const btnLabel = document.getElementById("btnLabel");
const btnSpinner = document.getElementById("btnSpinner");
const eyeToggle = document.getElementById("eyeToggle");
const confirmEyeToggle = document.getElementById("confirmEyeToggle");

// Check if email is valid by using regex
function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isPhoneValid(phone) {
  const pattern = /^01[0125][0-9]{8}$/;
  return pattern.test(phone);
}

// Show error under a specific field
function showFieldError(field, message) {
  if (field === "firstName") {
    firstNameError.textContent = message;
    firstNameError.classList.add("show");
    firstNameInput.classList.add("error");
  }
  if (field === "lastName") {
    lastNameError.textContent = message;
    lastNameError.classList.add("show");
    lastNameInput.classList.add("error");
  }
  if (field === "email") {
    emailError.textContent = message;
    emailError.classList.add("show");
    emailInput.classList.add("error");
  }
  if (field === "password") {
    passwordError.textContent = message;
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
  }
  if (field === "confirmPassword") {
    confirmPasswordError.textContent = message;
    confirmPasswordError.classList.add("show");
    confirmPasswordInput.classList.add("error");
  }
  if (field === "phone") {
    phoneError.textContent = message;
    phoneError.classList.add("show");
    phoneInput.classList.add("error");
  }
}

//  Hide error under a specific field
function hideFieldError(field) {
  if (field === "firstName") {
    firstNameError.textContent = "";
    firstNameError.classList.remove("show");
    firstNameInput.classList.remove("error");
  }
  if (field === "lastName") {
    lastNameError.textContent = "";
    lastNameError.classList.remove("show");
    lastNameInput.classList.remove("error");
  }
  if (field === "email") {
    emailError.textContent = "";
    emailError.classList.remove("show");
    emailInput.classList.remove("error");
  }
  if (field === "password") {
    passwordError.textContent = "";
    passwordError.classList.remove("show");
    passwordInput.classList.remove("error");
  }
  if (field === "confirmPassword") {
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.remove("show");
    confirmPasswordInput.classList.remove("error");
  }
  if (field === "phone") {
    phoneError.textContent = "";
    phoneError.classList.remove("show");
    phoneInput.classList.remove("error");
  }
}

function hideAllErrors() {
  hideFieldError("firstName");
  hideFieldError("lastName");
  hideFieldError("email");
  hideFieldError("phone");
  hideFieldError("password");
  hideFieldError("confirmPassword");
}

// Shows error under the right field
// Returns true if everything is valid
function validate(
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword,
) {
  let valid = true;

  if (!firstName) {
    showFieldError("firstName", "First name is required.");
    valid = false;
  }

  if (!lastName) {
    showFieldError("lastName", "Last name is required.");
    valid = false;
  }

  if (!email) {
    showFieldError("email", "Please enter your email address.");
    valid = false;
  } else if (!isEmailValid(email)) {
    showFieldError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (!phone) {
    showFieldError("phone", "Please enter your phone number.");
    valid = false;
  } else if (!isPhoneValid(phone)) {
    showFieldError("phone", "Please enter a valid phone number.");
    valid = false;
  }

  if (!password) {
    showFieldError("password", "Please enter your password.");
    valid = false;
  } else if (password.length < 6) {
    showFieldError("password", "Password must be at least 6 characters.");
    valid = false;
  }

  if (!confirmPassword) {
    showFieldError("confirmPassword", "You need to confirm your password.");
    valid = false;
  } else if (confirmPassword !== password) {
    showFieldError("confirmPassword", "password doesn't match.");
    valid = false;
  }

  return valid;
}

function setLoading(isLoading) {
  continueBtn.disabled = isLoading;
  continueBtn.classList.toggle("loading", isLoading);
}

eyeToggle.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  eyeToggle.classList.toggle("visible", isHidden);
});

confirmEyeToggle.addEventListener("click", () => {
  const isHidden = confirmPasswordInput.type === "password";
  confirmPasswordInput.type = isHidden ? "text" : "password";
  confirmEyeToggle.classList.toggle("visible", isHidden);
});

firstNameInput.addEventListener("input", () => {
  hideFieldError("firstName");
});

//Clear last name error as user types in last name field
lastNameInput.addEventListener("input", () => {
  hideFieldError("lastName");
});

//Clear email error as user types in email field
emailInput.addEventListener("input", () => {
  hideFieldError("email");
});

// Clear password error as user types in password field
passwordInput.addEventListener("input", () => {
  hideFieldError("password");
});

// Clear confirm password error as user types in confirm password field
confirmPasswordInput.addEventListener("input", () => {
  hideFieldError("confirmPassword");
});

// Clear phone error as user types in phone field
phoneInput.addEventListener("input", () => {
  hideFieldError("phone");
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideAllErrors();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value.trim();
  const phone = phoneInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const isValid = validate(firstName, lastName, email, phone, password, confirmPassword);
  if (!isValid) return;

  setLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        phone_number: phone,
        role: "Driver",  // ← only difference from user-register
      }),
    });

    const data = await response.json();

    if (!data.success) {
      showFieldError("email", data.message);
      return;
    }

    localStorage.setItem("pending_email", email);
    localStorage.setItem("pending_first_name", firstName);
    localStorage.setItem("pending_last_name", lastName);

    window.location.href = "verify-otp.html";

  } catch (err) {
    showFieldError("email", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});