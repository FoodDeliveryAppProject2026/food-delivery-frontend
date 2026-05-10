// Form
const forgotPassForm = document.getElementById("forgotPasswordForm");

// Input
const emailInput = document.getElementById("email");

// Inputs Errors
const emailError = document.getElementById("emailError");

// Btn
const continueBtn = document.getElementById("continueBtn");

// Show error under a specific field
function showFieldError(field, message) {
  if (field === "email") {
    emailError.textContent = message;
    emailError.classList.add("show");
    emailInput.classList.add("error");
  }
}

// Hide error under a specific field
function hideFieldError(field) {
  if (field === "email") {
    emailError.classList.remove("show");
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }
}

function hideAllErrors() {
  hideFieldError("email");
}

// Shows error under the right field
// Returns true if everything is valid
function validate(email) {
  let valid = true;

  if (!email) {
    showFieldError("email", "Please enter your code.");
    valid = false;
  }

  return valid;
}

function setLoading(isLoading) {
  continueBtn.disabled = isLoading;
  continueBtn.classList.toggle("loading", isLoading);
}

//Clear email error as user types in email field
emailInput.addEventListener("input", () => {
  hideFieldError("email");
});

forgotPassForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideAllErrors();

  const otp = emailInput.value.trim(); // this is actually the OTP code

  const isValid = validate(otp);
  if (!isValid) return;

  setLoading(true);

  localStorage.setItem("reset_otp", otp);

  try {
    // get the email that was saved during registration
    // works for both registration and forgot-password flows
    const email =
      localStorage.getItem("pending_email") ||
      localStorage.getItem("reset_email");

    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!data.success) {
      showFieldError("email", data.message);
      localStorage.removeItem("reset_otp"); // ❌ remove if failed
      return;
    }

    // ✅ OTP verified — save token
    const token = data.data.token;
    localStorage.setItem("token", token);

    // ✅ Clean up pending email
    localStorage.removeItem("pending_email");

    const flow = localStorage.getItem("otp_flow");

    if (flow === "forgot-password") {
      window.location.href = "../login/login.html";
    } else {
      window.location.href = "../new-password/new-password.html";
    }
  } catch (err) {
    showFieldError("email", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});
