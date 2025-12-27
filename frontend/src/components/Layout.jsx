import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="inner-container">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
