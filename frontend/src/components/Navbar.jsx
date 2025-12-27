import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.svg";
import HomeIcon from "../assets/home.svg?react";
import LogoutIcon from "../assets/logout.svg?react";
import HeartIcon from "../assets/heart.svg?react";
import HistoryIcon from "../assets/history.svg?react";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="sidenav-icon" /> },
    {
      name: "Top Items",
      path: "/top-items",
      icon: <HeartIcon className="sidenav-icon" />,
    },
    {
      name: "History",
      path: "/history",
      icon: <HistoryIcon className="sidenav-icon" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogoutIcon className="sidenav-icon" />,
    },
  ];

  return (
    <div className="sidenav">
      <div className="logo-container">
        <img src={logo} height={"50px"} width={"50px"} />
        <h2>SpotifyAPI</h2>
      </div>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="link-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
