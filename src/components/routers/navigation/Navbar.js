import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CartIcon from "./CartIcon";
import { LoginContext } from "../../context/login-context";
import { CarContext } from "../../context/cart-context";
import ErrorToaster from "../../error-toaster/ErrorToaster";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setJwtToken, setUserEmail } =
    useContext(LoginContext);
  const { setIsCartOpen } = useContext(CarContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setJwtToken("");
    setUserEmail("");
    navigate("./login");
    localStorage.clear();
    setIsCartOpen(false);
  };
  return (
    <>
      <ul className="topnav">
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
        {isLoggedIn && (
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
        )}
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

        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active-class"
                }
                to="/login"
              >
                LOGIN
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active-class"
                }
                to="/signup"
              >
                SIGN-UP
              </NavLink>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li className="logout" onClick={logoutHandler}>
              LOGOUT
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active-class"
                }
                to="/changePassword"
              >
                CHANGE PASSWORD
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "not-active-class"
            }
            to="/contact-us"
          >
            CONTACT-US
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="right">
            <CartIcon />
          </li>
        )}
      </ul>
      <Header />
      <Outlet />
      <ErrorToaster />
      <Footer />
    </>
  );
}
