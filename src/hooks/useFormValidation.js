import { useState } from "react";

//valueIsValid is function which will be passed by the caalling component to validate the value
export default function useFormValidation(valueIsValid) {
  const [enteredValue, setEnteredValue] = useState(""); //Value of input fiels
  const [isTouched, setIsTouched] = useState(false); //To verify that input field is touched

  const isValueValid = valueIsValid(enteredValue); //To check value is valid
  const hasError = !isValueValid && isTouched; //To check if there is any error

  //Calling whenever the value will be changed in iput
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  //Calling whenever input will lost focus
  const blurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValueValid: isValueValid,
    hasError,
    inputChangeHandler,
    blurHandler,
  };
}
