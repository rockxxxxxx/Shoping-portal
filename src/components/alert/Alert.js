import React, { useState } from "react";
import "./Alert.css";

export default function Alert({ message, type }) {
  const [isAlert, setIsAlert] = useState(true);
  const closeAlert = () => {
    setIsAlert(false);
  };
  return (
    <>
      {isAlert && (
        <div className={`alert ${type}`}>
          <span className="closebtn" onClick={closeAlert}>
            &times;
          </span>
          <strong>{message}</strong>
        </div>
      )}
    </>
  );
}
