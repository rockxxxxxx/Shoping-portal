import React from "react";
import "./Button.css";

export default function Button(props) {
  return <button className="button button1">{props.name}</button>;
}
