// PennyWise - Personal Expense Tracker
// Transactions are saved in the browser using localStorage.

const STORAGE_KEY = "pennywise_transactions";
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;

const form = document.getElementById("transaction-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const transactionList = document.getElementById("transaction-list");
const message = document.getElementById("form-message");

const today = new Date();
document.getElementById("today-date").textContent = today.toLocaleDateString("en-IN", {
  day: "numeric", month: "short", year: "numeric"
});
dateInput.value = today.toISOString().slice(0, 10);

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2
  }).format(value);
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#bd5a52" : "#1e6b50";
}

function resetForm() {
  form.reset();
  dateInput.value = today.toISOString().slice(0, 10);
  editingId = null;
  document.getElementById("form-heading").textContent = "Add a transaction";
  document.getElementById("submit-button").textContent = "Add transaction";
  document.getElementById("cancel-edit").classList.add("hidden");
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
    showMessage("Please enter a valid description, amount and date.", true);
    return;
  }

  const transaction = {
    id: editingId || Date.now().toString(),
    title,
    amount,
    type: typeInput.value,
    category: categoryInput.value,
    date
  };

  if (editingId) {
    transactions = transactions.map(item => item.id === editingId ? transaction : item);
    showMessage("Transaction updated successfully.");
  } else {
    transactions.push(transaction);
    showMessage("Transaction added successfully.");
  }

  saveTransactions();
  resetForm();
  renderApp();
});

document.getElementById("cancel-edit").addEventListener("click", function() {
  resetForm();
  showMessage("Edit cancelled.");
});

function calculateTotals() {
  const income = transactions
    .filter(item => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter(item => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  document.getElementById("income-value").textContent = formatMoney(income);
  document.getElementById("expense-value").textContent = formatMoney(expenses);
  document.getElementById("balance-value").textContent = formatMoney(income - expenses);
  document.getElementById("total-count").textContent = transactions.length;
  document.getElementById("transaction-count").textContent =
    `${transactions.length} ${transactions.length === 1 ? "entry" : "entries"}`;
}

function renderTransactions() {
  const searchText = document.getElementById("search").value.trim().toLowerCase();
  const selectedType = document.getElementById("filter-type").value;
  const selectedCategory = document.getElementById("filter-category").value;

  const filtered = transactions
    .filter(item => item.title.toLowerCase().includes(searchText))
    .filter(item => selectedType === "all" || item.type === selectedType)
    .filter(item => selectedCategory === "all" || item.category === selectedCategory)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (filtered.length === 0) {
    transactionList.innerHTML = `<tr><td colspan="5" class="empty-row">${
      transactions.length ? "No matching transactions found." : "No transactions yet. Add your first entry above."
    }</td></tr>`;
    return;
  }

  transactionList.innerHTML = filtered.map(item => `
    <tr>
      <td class="description-cell">${escapeHTML(item.title)} <span class="type-tag">${item.type}</span></td>
      <td>${escapeHTML(item.category)}</td>
      <td>${new Date(item.date + "T00:00:00").toLocaleDateString("en-IN")}</td>
      <td class="${item.type === "income" ? "amount-income" : "amount-expense"}">
        ${item.type === "income" ? "+" : "−"}${formatMoney(item.amount)}
      </td>
      <td>
        <button class="action-button" data-action="edit" data-id="${item.id}">Edit</button>
        <button class="action-button delete-button" data-action="delete" data-id="${item.id}">Delete</button>
      </td>
    </tr>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

transactionList.addEventListener("click", function(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = transactions.find(transaction => transaction.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "edit") {
    editingId = item.id;
    titleInput.value = item.title;
    amountInput.value = item.amount;
    typeInput.value = item.type;
    categoryInput.value = item.category;
    dateInput.value = item.date;
    document.getElementById("form-heading").textContent = "Edit transaction";
    document.getElementById("submit-button").textContent = "Save changes";
    document.getElementById("cancel-edit").classList.remove("hidden");
    document.querySelector(".form-panel").scrollIntoView({ behavior: "smooth" });
  }

  if (button.dataset.action === "delete") {
    const confirmed = confirm(`Delete "${item.title}"?`);
    if (!confirmed) return;
    transactions = transactions.filter(transaction => transaction.id !== item.id);
    saveTransactions();
    renderApp();
    showMessage("Transaction deleted.");
  }
});

function renderCategoryChart() {
  const totals = {};
  transactions.filter(item => item.type === "expense").forEach(item => {
    totals[item.category] = (totals[item.category] || 0) + item.amount;
  });

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const chart = document.getElementById("category-chart");

  if (entries.length === 0) {
    chart.innerHTML = '<p class="empty-note">Add expenses to see your category breakdown.</p>';
    return;
  }

  const maximum = entries[0][1];
  chart.innerHTML = entries.map(([category, amount]) => `
    <div class="chart-row">
      <span class="chart-label">${escapeHTML(category)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(amount / maximum) * 100}%"></div></div>
      <span class="chart-amount">${formatMoney(amount)}</span>
    </div>
  `).join("");
}

function renderApp() {
  calculateTotals();
  renderTransactions();
  renderCategoryChart();
}

["search", "filter-type", "filter-category"].forEach(id => {
  document.getElementById(id).addEventListener("input", renderTransactions);
  document.getElementById(id).addEventListener("change", renderTransactions);
});

document.getElementById("menu-button").addEventListener("click", function() {
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("open");
  this.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".main-nav").classList.remove("open"));
});

renderApp();
