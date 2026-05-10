// Form
const loginForm = document.getElementById("loginForm");

// Inputs
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

// Inputs Errors
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Btn
const continueBtn = document.getElementById("continueBtn");
const googleBtn = document.getElementById("googleBtn");
const remember = document.getElementById("remember");
const btnLabel = document.getElementById("btnLabel");
const btnSpinner = document.getElementById("btnSpinner");
const eyeToggle = document.getElementById("eyeToggle");

// Show error under a specific field
function showFieldError(field, message) {
  if (field === "email") {
    emailError.textContent = message;
    emailError.classList.add("show");
    emailInput.classList.add("error");
  }
  if (field === "password") {
    passwordError.textContent = message;
    passwordError.classList.add("show");
    passInput.classList.add("error");
  }
}

//  Hide error under a specific field
function hideFieldError(field) {
  if (field === "email") {
    emailError.classList.remove("show");
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }
  if (field === "password") {
    passwordError.classList.remove("show");
    passwordError.textContent = "";
    passInput.classList.remove("error");
  }
}

function hideAllErrors() {
  hideFieldError("email");
  hideFieldError("password");
}

// Shows error under the right field
// Returns true if everything is valid
function validate(email, password) {
  let valid = true;

  if (!email) {
    showFieldError("email", "Please enter your email address.");
    valid = false;
  }

  if (!password) {
    showFieldError("password", "Please enter your password.");
    valid = false;
  }

  return valid;
}

function setLoading(isLoading) {
  continueBtn.disabled = isLoading;
  continueBtn.classList.toggle("loading", isLoading);
}

eyeToggle.addEventListener("click", () => {
  const isHidden = passInput.type === "password";
  passInput.type = isHidden ? "text" : "password";
  eyeToggle.classList.toggle("visible", isHidden);
});

//Clear email error as user types in email field
emailInput.addEventListener("input", () => {
  hideFieldError("email");
});

// Clear password error as user types in password field
passInput.addEventListener("input", () => {
  hideFieldError("password");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideAllErrors();

  const email = emailInput.value.trim();
  const password = passInput.value;

  const isValid = validate(email, password);
  if (!isValid) return;

  setLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      showFieldError("email", data.message);
      return;
    }

    const token = data.data.token;
    if (remember.checked) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    window.location.href = "home.html";

  } catch (err) {
    showFieldError("email", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});
