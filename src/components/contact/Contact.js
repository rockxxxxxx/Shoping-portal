import React, { useState } from "react";
import Button from "../button/Button";
import "./Contact.css";

export default function Contact() {
  const formData = {
    name: "",
    email: "",
    phn: "",
  };

  const [formValue, setFormValue] = useState(formData);
  const { name, email, phn } = formValue;

  function submitHandler(event) {
    event.preventDefault();
    fetch("https://snap-battle-ae7cc-default-rtdb.firebaseio.com/user.json", {
      method: "POST",
      body: JSON.stringify(formValue),
    });
  }

  function handleOnChange(event) {
    const { name, value } = event.target;

    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="fname">
        <b>First Name</b>
      </label>
      <input type="text" name="name" value={name} onChange={handleOnChange} />

      <br />
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleOnChange}
      />
      <br />
      <label htmlFor="phn">
        <b>Phone No</b>
      </label>
      <input
        type="number"
        name="phn"
        value={phn}
        onChange={handleOnChange}
        style={{ marginBottom: "160px" }}
      />
      <br />
      <Button name="Submit" />
    </form>
  );
}
