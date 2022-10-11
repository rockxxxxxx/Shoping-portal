import React from "react";
import Category from "../categories/Category";
import "./directory.css";

export default function ({ categories }) {
  return (
    <div class="wrapper">
      {categories.map((category) => {
        return (
          <div>
        <Category category={category} />
        </div>
        );
      })}
    
    </div>
  );
}
