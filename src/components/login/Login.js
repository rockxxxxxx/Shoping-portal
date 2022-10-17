import React, { useContext, useState } from "react";
import "./login.css";
import useFormValidation from "../../hooks/useFormValidation";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Alert from "../alert/Alert";
import { LoginContext } from "../context/login-context";

const emailValidator = (value) => value.includes("@");
const passValidator = (value) => value.trim().length > 6;

export default function Login() {
  const [isLoader, setIsLoader] = useState(false);
  const [alert, setAlert] = useState({ messgae: "", type: "" });
  const { setIsLoggedIn, setJwtToken } = useContext(LoginContext);

  const navigate = useNavigate();

  //For Email Input
  const {
    value: enteredEmail,
    isValueValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useFormValidation(emailValidator);

  //For Password
  const {
    value: enteredPassword,
    isValueValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useFormValidation(passValidator);

  const formValue = {
    email: enteredEmail,
    password: enteredPassword,
    returnSecureToken: true,
  };

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  function onSumbitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      setIsLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdsHvoBdeXk4gI7b5YT7gux_E3UuI7ofo",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setIsLoader(false);
          if (response.ok) {
            setIsLoggedIn(true);
            navigate("/home");
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = "Email or password is wrong";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setJwtToken(data.idToken);
          localStorage.setItem("auth_token", data.idToken);
          setAlert({
            messgae: data.idToken,
            type: "success",
          });
        })
        .catch((err) => {
          setAlert({
            messgae: err.message,
            type: "",
          });
        });
    } else {
      console.log("not valid");
      emailBlurHandler();
      passwordBlurHandler();
    }
  }

  return (
    <>
      {alert.messgae && <Alert message={alert.messgae} type={alert.type} />}
      <form className="login" onSubmit={onSumbitHandler}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-75">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && (
              <p style={{ color: "red", textAlign: "left" }}>
                Please enter a valid email
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-75">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            {passwordInputHasError && (
              <p style={{ color: "red", textAlign: "left" }}>
                Please enter a valid password of six character
              </p>
            )}
          </div>
        </div>
        {!isLoader && <button>Submit</button>}
        {isLoader && (
          <div className="loaderContainer">
            <Loader />
          </div>
        )}
      </form>
      <h3>
        Don't have an account! <Link to="/signup">Signup</Link>
      </h3>
    </>
  );
}
