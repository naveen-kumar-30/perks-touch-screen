// ui.js
function navigateToStep(stepNumber) {
  window.AppState.currentStep = stepNumber;

  // Toggle visible sections
  document
    .querySelectorAll(".step-section")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById(`step-${stepNumber}`).classList.add("active");

  // Update Header Stepper
  document.querySelectorAll(".step").forEach((st, index) => {
    if (index + 1 <= stepNumber) st.classList.add("active");
    else st.classList.remove("active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Reset Inactivity Timer when moving steps (defined in app.js)
  if (typeof resetInactivityTimer === "function") resetInactivityTimer();
}

function renderGrid() {
  const gridContainer = document.getElementById("sports-grid");
  gridContainer.innerHTML = "";

  for (const [key, sport] of Object.entries(sportsData)) {
    const card = document.createElement("div");
    card.className = "sport-card";
    card.innerHTML = `
        <div class="card-image" style="background-image: url('${sport.img}')"></div>
        <div class="card-content">
            <h2>${sport.title}</h2>
        </div>
    `;
    card.addEventListener("click", () => selectSport(sport));
    gridContainer.appendChild(card);
  }
}

function selectSport(sport) {
  window.AppState.sport = sport;
  window.AppState.sportTitle = sport.title;
  window.AppState.price = 0;
  window.AppState.desc = "";

  renderPackageSelection(sport);
  updateSummary();
  navigateToStep(2);
}

function renderPackageSelection(sport) {
  document.getElementById("package-sport-title").innerText = sport.title;
  const pricingContainer = document.getElementById("package-pricing");
  pricingContainer.innerHTML = "";

  for (const [category, items] of Object.entries(sport.categories)) {
    const catDiv = document.createElement("div");
    catDiv.className = "category-group";
    catDiv.innerHTML = `<h3 class="category-title">${category}</h3>`;

    items.forEach((item) => {
      const priceDiv = document.createElement("div");
      priceDiv.className = "price-item";

      if (item.custom) {
        priceDiv.innerHTML = `<span>${item.desc}</span> <span class="price-tag">${item.custom}</span>`;
      } else {
        priceDiv.innerHTML = `<span>${item.desc}</span> <span class="price-tag">₹${item.price}</span>`;
        priceDiv.addEventListener("click", () => {
          document
            .querySelectorAll(".price-item")
            .forEach((el) => el.classList.remove("selected"));
          priceDiv.classList.add("selected");

          window.AppState.price = item.price;
          window.AppState.desc = `${category} - ${item.desc}`;
          updateSummary();

          if (typeof resetInactivityTimer === "function")
            resetInactivityTimer();
        });
      }
      catDiv.appendChild(priceDiv);
    });
    pricingContainer.appendChild(catDiv);
  }
}

function updateSummary() {
  document.getElementById("summ-sport").innerText =
    window.AppState.sportTitle || "-";
  document.getElementById("summ-desc").innerText = window.AppState.desc || "-";
  document.getElementById("summ-amount").innerText =
    `₹${window.AppState.price}`;
  document.getElementById("goto-pay-btn").disabled = window.AppState.price <= 0;
  document.getElementById("pay-total-amount").innerText =
    `₹${window.AppState.price}`;
}

function showSuccessScreen(transactionId) {
  document.getElementById("txn-id-display").innerText = transactionId;
  navigateToStep(4);
}
