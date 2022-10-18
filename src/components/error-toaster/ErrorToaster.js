import React, { useContext, useEffect } from "react";
import { ErrorContext } from "../context/error-context";
import "./ErrorToaster.css";

export default function ErrorToaster() {
  const { isMessage, isToaster, setIsToaster } = useContext(ErrorContext);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsToaster(false);
  //     }, 800);
  //   }, [isToaster]);
  return (
    <>
      {isToaster && (
        <div id="snackbar" class="show">
          {isMessage} <i class="x icon" onClick={() => setIsToaster(false)}></i>
        </div>
      )}
    </>
  );
}
