import React from "react";
import "./login.css";
import useFormValidation from "../hooks/useFormValidation";
import { Link } from "react-router-dom";

const emailValidator = (value) => value.includes("@");
const passValidator = (value) => value.trim().length > 6;

export default function Login() {
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

  function onSumbitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdsHvoBdeXk4gI7b5YT7gux_E3UuI7ofo",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      console.log("not valid");
      emailBlurHandler();
      passwordBlurHandler();
    }
  }

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  return (
    <>
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
        <button>Submit</button>
      </form>
      <h3>
        Don't have an account! <Link to="/signup">Signin</Link>
      </h3>
    </>
  );
}
