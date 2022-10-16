import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <>
      <ul class="topnav">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/store"
          >
            STORE
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/about"
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/signup"
          >
            Singnup
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/contact-us"
          >
            Contact Us
          </NavLink>
        </li>
        <li class="right">
          <CartIcon />
        </li>
      </ul>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
