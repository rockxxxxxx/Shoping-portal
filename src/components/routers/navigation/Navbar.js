import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CartIcon from "./CartIcon";
import { LoginContext } from "../../context/login-context";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setJwtToken } = useContext(LoginContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setJwtToken("");
    navigate("./login");
    localStorage.removeItem("auth_token");
  };
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
            (
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
            )
          </>
        )}
        {isLoggedIn && (
          <>
            (
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
            )
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
