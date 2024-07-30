import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
// component:
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";
// eslint-disable-next-line react/prop-types
const AfterLoginHomePage = ({ userName, budgets, expenses }) => {
  return (
    <div className="dashboard">
      <h1>
        Welcome back,{" "}
        <span
          className="accent text"
          style={{ textShadow: "2px 2px 6px rgba(255, 165, 0, 0.5)" }}
        >
          {userName}
        </span>
      </h1>
      <div className="grid-sm">
        {budgets && budgets.length > 0 ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets:</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
            </div>
            {expenses && expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table
                  expenses={expenses
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 7)}
                />
                {expenses.length > 7 && (
                  <Link to="expenses" className="btn btn-dark mt-5">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterLoginHomePage;
