import React, { useState } from "react";
import "./signup.css";
import useFormValidation from "../../hooks/useFormValidation";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import Alert from "../alert/Alert";

const emailValidator = (value) => value.includes("@");
const passValidator = (value) => value.trim().length > 6;

export default function SignUp() {
  const [loader, setLoader] = useState(false);
  const [serverError, setServerError] = useState({
    message: "",
    type: "",
  });
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
  if (emailIsValid && passwordIsValid && !loader) {
    formIsValid = true;
  }

  function onSumbitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      setLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdsHvoBdeXk4gI7b5YT7gux_E3UuI7ofo",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setLoader(false);
        if (res.ok) {
          setServerError({
            message: "You have successfully registered",
            type: "success",
          });
        } else {
          return res.json().then((data) => {
            if (data.error.message === "EMAIL_EXISTS") {
              setServerError({
                message: "This email is already registerd",
                type: "",
              });
            } else {
              setServerError({
                message: "Something went wrong! Please again later",
                type: "",
              });
            }
          });
        }
      });
    } else {
      console.log("not valid");
      emailBlurHandler();
      passwordBlurHandler();
    }
  }

  return (
    <>
      {serverError.message && (
        <Alert message={serverError.message} type={serverError.type} />
      )}
      <form className="signup" onSubmit={onSumbitHandler}>
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
        {!loader && <button>Submit</button>}
        {loader && (
          <div className="loaderContainer">
            <Loader />
          </div>
        )}
      </form>
      <h3>
        Already have an account! <Link to="/login">Login</Link>
      </h3>
    </>
  );
}
