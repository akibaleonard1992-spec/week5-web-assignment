# SpendWise

SpendWise is a personal budgeting web application that helps users compare a monthly
budget with their expenses. Users can enter values in the page form or use the
"Use prompts" button to enter them through browser prompts. The app calculates the
remaining balance and shows the result on the page and in the browser console.

## JavaScript Concepts

- Variables: `monthlyBudget`, `totalExpenses`, and `remainingBalance` store the
  application data.
- Data types: Number values represent currency amounts, while strings are used for
  labels and status messages.
- User input: The HTML form and `window.prompt()` collect budget and expense values.
- Calculations: `calculateRemainingBalance()` subtracts expenses from the budget.
  `calculateSpentPercentage()` determines how much of the budget has been spent.
- Reusable functions: Functions separate input validation, calculations, formatting,
  and result display.
- DOM interaction: JavaScript updates displayed balance, expense totals, status
  text, and the progress meter.
- Console output: A labeled budget summary is written to the browser console.

## How Variables Are Used

The variables in `script.js` store the user's total budget, total expenses, and
calculated remaining balance. Values collected by the form or prompts are converted
to numbers before use.

## How User Input Is Collected

Users enter a budget and expenses in the two number fields and submit the form.
The "Use prompts" button provides an alternative prompt-based input flow.

## How Calculations Are Performed

The app validates that both values are non-negative numbers, then uses:

`remainingBalance = budget - expenses`

The percentage used by the visual meter is calculated by dividing expenses by the
budget and limiting the result to 100 percent.

## How Functions Organize the Code

Dedicated functions handle formatting, validation, calculations, DOM updates,
form submission, and prompt input. This keeps the application logic reusable and
easy to maintain.
