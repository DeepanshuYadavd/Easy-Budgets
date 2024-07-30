// rrd imports:
import { redirect } from "react-router-dom";
// helper:
import { deleteData } from "../Helper";
// toast :
import { toast } from "react-toastify";
export const logOutAction = async () => {
  // delete the user:
  deleteData({
    key: "userName",
    id: null,
  });
  // delete budget:
  deleteData({
    key: "budgets",
    id: null,
  });
  // dlete expenses:
  deleteData({
    key: "expenses",
    id: null,
  });
  // toaster:
  toast.success("User deleted successfully", {
    position: "top-center",
    theme: "dark",
  });
  // redirect to home:
  return redirect("/");
};
