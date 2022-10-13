import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CartDropdown from "../../cart-dropdown/CartDropdown";
import { Outlet } from "react-router-dom";
import { CarContext } from "../../context/cart-context";

export default function Navbar() {
  const {isCartOpen,setIsCartOpen} = useContext(CarContext)
  const {cartCount} = useContext(CarContext)
  const mangeCartDropdwn = ()=>{
    setIsCartOpen(!isCartOpen)
  }
  return (
    <>
      <div className="Navbar">
        <div className="nav-links-container">
          <Link className="logo-container" to="/">
            HOME
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="logo-container" to="/store">
            STORE
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="logo-container" to="/about">
            ABOUT
          </Link>
        </div>
        <div className="icon">
          <i class="corner big  inverted shopping cart icon" onClick={mangeCartDropdwn} style={{cursor: "pointer"}}>{cartCount}</i>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}
