import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
const Layout = () => {
  return (
    <div className="w-full h-screen  bg-cover bg-center bg-no-repeat">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
