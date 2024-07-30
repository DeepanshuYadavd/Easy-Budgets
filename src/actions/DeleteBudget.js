import { toast } from "react-toastify";
import { deleteData, getAllbudgets } from "../Helper";
import { redirect } from "react-router-dom";
export const deleteBudget = ({ params }) => {
  try {
    deleteData({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllbudgets({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    associatedExpenses.forEach((expense) => {
      deleteData({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Budget deleted successfully!", {
      theme: "dark",
      position: "top-center",
    });
  } catch (err) {
    throw new Error("There was problem deleting your budget");
  }
  return redirect("/");
};
