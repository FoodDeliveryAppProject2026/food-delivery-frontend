// ===========================
// FoodDash Login — JavaScript
// ===========================

/**
 * Toggle password field visibility
 */
function togglePassword() {
  const input = document.getElementById('password');
  const btn = document.querySelector('.toggle-pass');

  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

/**
 * Show an error message in the error banner
 * @param {string} message
 */
function showError(message) {
  const errorMsg = document.getElementById('errorMsg');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorMsg.classList.add('show');
}

/**
 * Hide the error banner
 */
function hideError() {
  document.getElementById('errorMsg').classList.remove('show');
}

/**
 * Set the login button into loading state
 * @param {boolean} isLoading
 */
function setLoading(isLoading) {
  const btn = document.getElementById('loginBtn');
  if (isLoading) {
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

/**
 * Simulate an API login call
 * Replace this function with your real API call when ready.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
function fakeApiLogin(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo credentials — swap this with a real fetch() to your backend
      if (email === 'demo@fooddash.com' && password.length >= 1) {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Invalid email or password. Try demo@fooddash.com' });
      }
    }, 1500);
  });
}

/**
 * Handle login form submission
 * @param {Event} e
 */
async function handleLogin(e) {
  e.preventDefault();
  hideError();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Basic client-side validation
  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  setLoading(true);

  const result = await fakeApiLogin(email, password);

  setLoading(false);

  if (result.success) {
    // ✅ Success — update button and redirect
    const btn = document.getElementById('loginBtn');
    btn.style.background = '#22c55e';
    btn.querySelector('.btn-text').textContent = '✓ Success! Redirecting...';

    // Redirect after short delay (replace '/' with your home route)
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } else {
    // ❌ Failure — show error
    showError(result.message || 'Something went wrong. Please try again.');
  }
}