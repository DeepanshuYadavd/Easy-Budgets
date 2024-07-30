// rrd imports:
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// libraries:
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// layouts:
import Main, { MainLoader } from "./layouts/Main";

// actions:
import { logOutAction } from "./actions/logout";
import { deleteBudget } from "./actions/DeleteBudget";

// pages:
import PageNotFound from "./pages/PageNotFound";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPAge, {
  expenseAction,
  expensesLoader,
} from "./pages/ExpensesPAge";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLoader,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <PageNotFound />,
      },
      {
        path: "budgets/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <PageNotFound />,
        children: [{ path: "delete", action: deleteBudget }],
      },
      {
        path: "expenses",
        element: <ExpensesPAge />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <PageNotFound />,
      },
      {
        path: "logout",
        action: logOutAction,
      },
      // {
      //   path: "*",
      //   element: <PageNotFound />,
      // },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
