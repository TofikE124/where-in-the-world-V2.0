import { Outlet } from "react-router-dom";
import Navbar from "../components/Header";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
