import { useLoaderData } from "react-router-dom";
import { deleteData, fetchData, wait } from "../Helper";
import Table from "../components/Table";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

// eslint-disable-next-line react-refresh/only-export-components
export const expenseAction = async ({ request }) => {
  await wait();
  const data = await request.formData();
  const entries = Object.fromEntries(data);
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

const ExpensesPAge = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expense to show</p>
      )}
    </div>
  );
};

export default ExpensesPAge;
