// app.js

// --- Kiosk Inactivity Timer Logic ---
let inactivityTimer;
const KIOSK_TIMEOUT_MS = 60000; // 60 seconds of no tapping resets the kiosk

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  // Only start timer if user is NOT on step 1 (home) and NOT on step 4 (success)
  if (window.AppState.currentStep > 1 && window.AppState.currentStep < 4) {
    inactivityTimer = setTimeout(() => {
      // Auto-reset kiosk
      navigateToStep(1);
    }, KIOSK_TIMEOUT_MS);
  }
}

function clearInactivityTimer() {
  clearTimeout(inactivityTimer);
}

// Reset timer whenever user touches the screen
document.addEventListener("touchstart", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);
// ------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  // Navigation Buttons
  document.querySelectorAll(".back-to-sports").forEach((btn) => {
    btn.addEventListener("click", () => navigateToStep(1));
  });

  document
    .getElementById("goto-pay-btn")
    .addEventListener("click", () => navigateToStep(3));
  document
    .getElementById("back-to-packages")
    .addEventListener("click", () => navigateToStep(2));

  // Razorpay Button
  document.getElementById("final-pay-btn").addEventListener("click", (e) => {
    e.preventDefault();
    triggerRazorpayPayment();
  });

  // Visual toggle for dummy payment cards
  document.querySelectorAll(".pay-option-card").forEach((card) => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".pay-option-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
});
