// rrd imports:
import { useLoaderData } from "react-router-dom";
// helper:
import {
  fetchData,
  createBudget,
  createExpense,
  wait,
  deleteData,
} from "../Helper";

// component:
import AfterLoginHomePage from "../components/AfterLoginHomePage";
import BeforeLoginHomePage from "../components/BeforeLoginHomePage";

// library:
import { toast } from "react-toastify";

// loader:
// eslint-disable-next-line react-refresh/only-export-components
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};
// action:
// eslint-disable-next-line react-refresh/only-export-components
export const dashboardAction = async ({ request }) => {
  await wait();
  const data = await request.formData();
  const entries = Object.fromEntries(data);

  // new user:
  if (entries.userName && entries._action === "newUser") {
    try {
      // throw new Error("hlo");
      localStorage.setItem("userName", JSON.stringify(entries.userName));
      return toast.success("User logged in successfuly", {
        theme: "dark",
        position: "top-center",
      });
    } catch (er) {
      throw new Error("There was a problem creating your account ");
    }
  }
  // new budget:
  if (entries.newBudget && entries._action === "budget") {
    try {
      // create budget:
      createBudget(entries.newBudget, entries.newBudgetAmount);
      // return success msg:
      return toast.success("Budget created", {
        theme: "dark",
        position: "top-center",
      });
    } catch (err) {
      throw new Error("There was a problem creating your budget");
    }
  }
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

// component:
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        // eslint-disable-next-line no-undef
        <AfterLoginHomePage
          userName={userName}
          budgets={budgets}
          expenses={expenses}
        />
      ) : (
        <BeforeLoginHomePage />
      )}
    </>
  );
};

export default Dashboard;
