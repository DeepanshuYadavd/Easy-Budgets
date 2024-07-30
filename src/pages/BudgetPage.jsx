import { useLoaderData } from "react-router-dom";
import { createExpense, deleteData, getAllbudgets, wait } from "../Helper";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const budgetLoader = async ({ params }) => {
  // budget
  const budget = getAllbudgets({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  // expense
  const expenses = getAllbudgets({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }
  return { budget, expenses };
};

// action:
// eslint-disable-next-line react-refresh/only-export-components
export const budgetAction = async ({ request }) => {
  await wait();
  const data = await request.formData();
  const entries = Object.fromEntries(data);
  // new expense:
  if (entries.newExpense && entries._action === "createExpense") {
    try {
      // create expense:
      createExpense(
        entries.newExpense,
        entries.newExpenseAmount,
        entries.newExpenseBudget
      );
      // return success msg:
      return toast.success(`Expense ${entries.newExpense} created`, {
        theme: "dark",
        position: "top-center",
      });
    } catch (err) {
      throw new Error("There was a problem creating your budget");
    }
  }

  // Delete particalar expense:
  if (entries._action === "deleteExpense") {
    try {
      // delete expense:
      deleteData({
        key: "expenses",
        id: entries.expenseId,
      });
      // return success msg:
      return toast.success(`Expense deleted`, {
        theme: "dark",
        position: "top-center",
      });
    } catch (err) {
      throw new Error("There was a problem deleting your expense");
    }
  }
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  //   console.log(budget);
  //   console.log(expenses);
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        {" "}
        <span className="accent"> {budget.name}</span> Overview
      </h1>

      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
