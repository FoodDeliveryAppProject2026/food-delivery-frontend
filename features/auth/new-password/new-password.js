// Form
const forgotPassForm = document.getElementById("forgotPasswordForm");

const passwordInput = document.getElementById("password");

const passwordError = document.getElementById("passwordError");

// Btn
const continueBtn = document.getElementById("continueBtn");

// Show error under a specific field
function showFieldError(field, message) {
  if (field === "password") {
    passwordError.textContent = message;
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
  }
}

//  Hide error under a specific field
function hideFieldError(field) {
  if (field === "password") {
    passwordError.textContent = "";
    passwordError.classList.remove("show");
    passwordInput.classList.remove("error");
  }
}

function hideAllErrors() {
  hideFieldError("password");
}

// Shows error under the right field
// Returns true if everything is valid
function validate(password) {
  let valid = true;

  if (!password) {
    showFieldError("password", "Please enter your password.");
    valid = false;
  } else if (password.length < 6) {
    showFieldError("password", "Password must be at least 6 characters.");
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

// Clear password error as user types in password field
passwordInput.addEventListener("input", () => {
  hideFieldError("password");
});

forgotPassForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  hideAllErrors();

  const password = passwordInput.value;

  const isValid = validate(password);
  if (!isValid) return;
});
