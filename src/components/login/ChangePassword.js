import React, { useContext, useState } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import Loader from "../loader/Loader";
import Alert from "../alert/Alert";
import { LoginContext } from "../context/login-context";

const passValidator = (value) => value.trim().length > 6;

export default function ChangePassword() {
  const [isLoader, setIsLoader] = useState(false);
  const [alert, setAlert] = useState({ messgae: "", type: "" });
  const { isLoggedIn, jwtToken } = useContext(LoginContext);

  //For Password
  const {
    value: enteredPassword,
    isValueValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useFormValidation(passValidator);

  const formValue = {
    idToken: jwtToken,
    password: enteredPassword,
    returnSecureToken: true,
  };

  let formIsValid = false;
  if (passwordIsValid) {
    formIsValid = true;
  }

  function onSumbitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      setIsLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdsHvoBdeXk4gI7b5YT7gux_E3UuI7ofo",
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
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = "Something went wrong! Please try again later";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setAlert({
            messgae: "Your password has been successfully updated",
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
      passwordBlurHandler();
    }
  }

  return (
    <>
      {isLoggedIn && (
        <>
          {alert.messgae && <Alert message={alert.messgae} type={alert.type} />}
          <form className="login" onSubmit={onSumbitHandler}>
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
        </>
      )}
      {!isLoggedIn && (
        <h1 style={{ marginBottom: "200px", marginTop: "200px" }}>
          Hey! you are on a wrong page
        </h1>
      )}
    </>
  );
}
