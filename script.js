"use strict";

// Application variables
let monthlyBudget = 0;
let totalExpenses = 0;
let remainingBalance = 0;

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 2,
});

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const expensesInput = document.getElementById("expensesInput");
const balanceElement = document.getElementById("balance");
const budgetResult = document.getElementById("budgetResult");
const expenseResult = document.getElementById("expenseResult");
const meterFill = document.getElementById("meterFill");
const statusElement = document.getElementById("status");
const formError = document.getElementById("formError");
const promptButton = document.getElementById("promptButton");

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

function calculateRemainingBalance(budget, expenses) {
  return budget - expenses;
}

function calculateSpentPercentage(budget, expenses) {
  if (budget <= 0) {
    return 0;
  }

  return Math.min((expenses / budget) * 100, 100);
}

function readAndValidateInputs() {
  monthlyBudget = Number(budgetInput.value);
  totalExpenses = Number(expensesInput.value);

  if (
    budgetInput.value.trim() === "" ||
    expensesInput.value.trim() === "" ||
    !Number.isFinite(monthlyBudget) ||
    !Number.isFinite(totalExpenses) ||
    monthlyBudget < 0 ||
    totalExpenses < 0
  ) {
    formError.textContent = "Enter a valid, non-negative budget and expense amount.";
    console.error("Validation error: Invalid budget or expense input.");
    return false;
  }

  formError.textContent = "";
  return true;
}

function displayResults() {
  remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);
  const spentPercentage = calculateSpentPercentage(monthlyBudget, totalExpenses);

  balanceElement.textContent = formatCurrency(remainingBalance);
  budgetResult.textContent = formatCurrency(monthlyBudget);
  expenseResult.textContent = formatCurrency(totalExpenses);
  meterFill.style.width = `${spentPercentage}%`;

  if (remainingBalance < 0) {
    statusElement.textContent = "Your expenses are higher than your budget.";
  } else if (remainingBalance === 0) {
    statusElement.textContent = "Your budget is fully allocated.";
  } else {
    statusElement.textContent = "You have budget available for future spending.";
  }

  console.log("=== SpendWise Budget Summary ===");
  console.log("Monthly Budget:", formatCurrency(monthlyBudget));
  console.log("Total Expenses:", formatCurrency(totalExpenses));
  console.log("Remaining Balance:", formatCurrency(remainingBalance));
  console.log("Status:", statusElement.textContent);
}

function processBudgetForm(event) {
  event.preventDefault();

  if (readAndValidateInputs()) {
    displayResults();
  }
}

function getPromptNumber(question) {
  const answer = window.prompt(question);

  if (answer === null) {
    return null;
  }

  const value = Number(answer);

  if (answer.trim() === "" || !Number.isFinite(value) || value < 0) {
    window.alert("Please enter a valid, non-negative number.");
    return null;
  }

  return value;
}

function collectInputWithPrompts() {
  const budget = getPromptNumber("Enter your total monthly budget:");

  if (budget === null) {
    return;
  }

  const expenses = getPromptNumber("Enter your total monthly expenses:");

  if (expenses === null) {
    return;
  }

  monthlyBudget = budget;
  totalExpenses = expenses;
  budgetInput.value = String(monthlyBudget);
  expensesInput.value = String(totalExpenses);
  formError.textContent = "";
  displayResults();

  window.alert(
    `Remaining balance: ${formatCurrency(remainingBalance)}`
  );
}

budgetForm.addEventListener("submit", processBudgetForm);
promptButton.addEventListener("click", collectInputWithPrompts);

console.log("SpendWise JavaScript loaded successfully.");
