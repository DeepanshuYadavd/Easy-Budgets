import { Outlet, useLoaderData } from "react-router-dom";

// helper function:
import { fetchData } from "../Helper";

// pages:
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// eslint-disable-next-line react-refresh/only-export-components
// loader:
export function MainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

// component:
const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <NavBar userName={userName} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
