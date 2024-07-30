// rrd imports:
import { redirect } from "react-router-dom";
// helper:
import { deleteData } from "../Helper";
// toast :
import { toast } from "react-toastify";
export const logOutAction = async () => {
  // delete the user:
  deleteData("userName");
  // delete budget:
  deleteData("budgets");
  // dlete expenses:
  deleteData("expenses");
  // toaster:
  toast.success("User deleted successfully", {
    position: "top-center",
    theme: "dark",
  });
  // redirect to home:
  return redirect("/");
};
