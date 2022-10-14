import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import CartDropdown from "../../cart-dropdown/CartDropdown";
import { Outlet } from "react-router-dom";
import { CarContext } from "../../context/cart-context";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

export default function Navbar() {
  const { isCartOpen, setIsCartOpen } = useContext(CarContext);
  const { cartCount } = useContext(CarContext);
  const mangeCartDropdwn = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <div className="Navbar">
        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) =>
              isActive ? "lactive-class" : "not-active-class"
            }
            to="/home"
          >
            HOME
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) =>
              isActive ? "lactive-class" : "not-active-class"
            }
            to="/store"
          >
            STORE
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) =>
              isActive ? "lactive-class" : "not-active-class"
            }
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) =>
              isActive ? "lactive-class" : "not-active-class"
            }
            to="/contact-us"
          >
            Contact Us
          </NavLink>
        </div>
        <div className="icon">
          <i
            class="corner big  inverted shopping cart icon"
            onClick={mangeCartDropdwn}
            style={{ cursor: "pointer" }}
          >
            {cartCount}
          </i>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
