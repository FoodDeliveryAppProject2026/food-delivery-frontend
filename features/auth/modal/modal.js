// ── MODAL SYSTEM ──
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
  const iframe = document.querySelector(`#${id} iframe`);
  if (iframe) { const s = iframe.src; iframe.src = ""; iframe.src = s; }
}

// Listen for messages from iframes (so login.html can trigger signUpModal etc.)
window.addEventListener("message", (e) => {
  if (e.data?.openModal)  openModal(e.data.openModal);
  if (e.data?.closeModal) closeModal(e.data.closeModal);
});

document.addEventListener("DOMContentLoaded", () => {
  // data-modal="signIn"  →  opens signInModal
  // data-modal="signUp"  →  opens signUpModal
  // data-modal="forgot"  →  opens forgotModal
  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.modal + "Modal"));
  });

  // Close buttons
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });

  // Click outside
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
    ["signInModal", "signUpModal", "forgotModal", 
     "userRegisterModal", "vendorRegisterModal", 
     "driverRegisterModal", "otpModal"].forEach(closeModal);
    }
  });
});

window.addEventListener("message", (e) => {
  console.log("message received:", e.data); // ← add this
  if (e.data?.openModal)  openModal(e.data.openModal);
  if (e.data?.closeModal) closeModal(e.data.closeModal);
});