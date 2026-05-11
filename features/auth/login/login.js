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
const eyeToggle = document.getElementById("eyeToggle");
const remember = document.getElementById("remember");

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

// Hide error under a specific field
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

function validate(email, password) {
  let valid = true;
  if (!email) { showFieldError("email", "Please enter your email address."); valid = false; }
  if (!password) { showFieldError("password", "Please enter your password."); valid = false; }
  return valid;
}

function setLoading(isLoading) {
  continueBtn.disabled = isLoading;
  continueBtn.classList.toggle("loading", isLoading);
}

// Eye toggle
if (eyeToggle) {
  eyeToggle.addEventListener("click", () => {
    const isHidden = passInput.type === "password";
    passInput.type = isHidden ? "text" : "password";
    eyeToggle.classList.toggle("visible", isHidden);
  });
}

// Clear errors on input
emailInput.addEventListener("input", () => hideFieldError("email"));
passInput.addEventListener("input", () => hideFieldError("password"));

// Submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("login submitted"); // ← debug
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

    // ✅ Save token based on remember me checkbox
    if (remember && remember.checked) {
      localStorage.setItem("token", token);
    } else {
      localStorage.setItem("token", token); // save anyway
    }

    window.location.href = "../../home/home.html";

  } catch (err) {
    console.error(err);
    showFieldError("email", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});

// "Forget Password" link
document.querySelector(".forgot-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.parent.postMessage({ closeModal: "signInModal" }, "*");
  window.parent.postMessage({ openModal: "forgotModal" }, "*");
});

// "New To Hot Meal? Sign Up →" link
document.querySelector(".signup-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.parent.postMessage({ closeModal: "signInModal" }, "*");
  window.parent.postMessage({ openModal: "signUpModal" }, "*");
});

if (window.self !== window.top) {
  document.body.classList.add("in-modal");
}