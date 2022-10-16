import React from "react";
import "./Contact.css";
import useFormValidation from "../../hooks/useFormValidation";

const nameValidator = (value) => value.trim() !== "";
const emailValidator = (value) => value.includes("@");
const messageValidator = (value) => value.trim().length > 20;

export default function Contact() {
  const {
    value: enteredName,
    isValueValid: nameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useFormValidation(nameValidator);

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
    value: enteredMessage,
    isValueValid: messageIsValid,
    hasError: messageInputHasError,
    inputChangeHandler: messageChangeHandler,
    blurHandler: messageBlurHandler,
  } = useFormValidation(messageValidator);
  let formIsValid = false;
  if (nameIsValid && emailIsValid && messageIsValid) {
    formIsValid = true;
  }

  const formValue = {
    email: enteredEmail,
    message: enteredMessage,
    name: enteredName,
  };

  function onSumbitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      fetch("https://snapbook-2ae40-default-rtdb.firebaseio.com/contact.json", {
        method: "POST",
        body: JSON.stringify(formValue),
        heders: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("not valid");
      nameBlurHandler();
      emailBlurHandler();
      messageBlurHandler();
    }
  }

  return (
    <form onSubmit={onSumbitHandler}>
      <div className="row">
        <div className="col-25">
          <label htmlFor="name">Name</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <p style={{ color: "red", textAlign: "left" }}>
              Entered a valid name
            </p>
          )}
        </div>
      </div>
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
          <label htmlFor="msg">Your Message</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="message"
            placeholder="Enter your message"
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
            value={enteredMessage}
          />
          {messageInputHasError && (
            <p style={{ color: "red", textAlign: "left" }}>
              Please enter a valid message
            </p>
          )}
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
}
