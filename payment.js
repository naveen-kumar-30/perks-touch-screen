// payment.js
function triggerRazorpayPayment() {
  if (window.AppState.price <= 0) {
    alert("Please select a package.");
    return;
  }
  if (
    ENV.RAZORPAY_KEY_ID === "YOUR_RAZORPAY_KEY_ID_HERE" ||
    ENV.RAZORPAY_KEY_ID === ""
  ) {
    alert("SYSTEM ERROR: Razorpay API Key missing in config.js");
    return;
  }
  if (typeof Razorpay === "undefined") {
    alert("SYSTEM ERROR: Check internet connection.");
    return;
  }

  const finalPayBtn = document.getElementById("final-pay-btn");
  finalPayBtn.innerText = "Connecting secure gateway...";
  finalPayBtn.disabled = true;

  // Pause kiosk timer during payment
  if (typeof clearInactivityTimer === "function") clearInactivityTimer();

  var options = {
    key: ENV.RAZORPAY_KEY_ID,
    amount: window.AppState.price * 100,
    currency: ENV.CURRENCY,
    name: ENV.ACADEMY_NAME,
    description: `Booking: ${window.AppState.sportTitle} - ${window.AppState.desc}`,
    image: "https://dummyimage.com/150x150/0F172A/ffffff.png&text=Perks",
    handler: function (response) {
      finalPayBtn.innerText = "Tap to Pay Securely";
      finalPayBtn.disabled = false;
      showSuccessScreen(response.razorpay_payment_id);
    },
    prefill: { name: "Kiosk User", contact: "" },
    theme: { color: "#2563EB" }, // Matches the accent blue
    modal: {
      ondismiss: function () {
        finalPayBtn.innerText = "Tap to Pay Securely";
        finalPayBtn.disabled = false;
        // Resume timer if closed
        if (typeof resetInactivityTimer === "function") resetInactivityTimer();
      },
    },
  };

  try {
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed: " + response.error.description);
      finalPayBtn.innerText = "Tap to Pay Securely";
      finalPayBtn.disabled = false;
      if (typeof resetInactivityTimer === "function") resetInactivityTimer();
    });
    rzp1.open();
  } catch (error) {
    alert("SYSTEM ERROR: " + error.message);
    finalPayBtn.innerText = "Tap to Pay Securely";
    finalPayBtn.disabled = false;
  }
}
