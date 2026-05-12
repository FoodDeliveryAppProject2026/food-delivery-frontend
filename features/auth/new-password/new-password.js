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
  // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
  //   showFieldError("password", "Password must contain uppercase, lowercase, number and special character.");
  //   valid = false;
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

  setLoading(true);

  try {
    const email = localStorage.getItem("reset_email");
    const otp = localStorage.getItem("reset_otp"); // saved from verify-otp page

    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, new_password: password }),
    });

    const data = await response.json();

    if (!data.success) {
      showFieldError("password", data.message);
      return;
    }

    // ✅ Clean up localStorage
    localStorage.removeItem("reset_email");
    localStorage.removeItem("reset_otp");

    // ✅ Go to login
    window.location.href = "../login/login.html";

  } catch (err) {
    showFieldError("password", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});
