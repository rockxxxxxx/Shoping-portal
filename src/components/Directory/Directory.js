import React from "react";
import Category from "../categories/Category";
import "./directory.css";

export default function Directory({ categories }) {
  return (
    <div class="wrapper">
      {categories.map((category) => {
        return (
          <div>
            <Category key={category.id} category={category} />
          </div>
        );
      })}
    </div>
  );
}
