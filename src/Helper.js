// time take to creating budget so that we can disabld that button:
export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 700));

// generate random color for budget card:
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")
    ? fetchData("budgets").length
    : 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// fetching data from localStorage:
export const fetchData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

// create budget and store data in localstorage:
export const createBudget = (name, amount) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };
  const existingBudget = fetchData("budgets") ?? [];
  localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]));
};

// create expense:
export const createExpense = (name, amount, budgetId) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };
  const existingExpense = fetchData("expenses") ?? [];
  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newItem])
  );
};

// delete  froitemsm local storage:
export const deleteData = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// format currence:
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// total spent by budget:
export const calculateSpentByBudget = (budgetId) => {
  const expense = fetchData("expenses") ?? [];
  const budgetSpent = expense.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// format percentage:
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// match budgets with corresponding expense:
export const getAllbudgets = ({ category, key, value }) => {
  const data = fetchData(category);

  return data.filter((item) => item[key] === value);
};
