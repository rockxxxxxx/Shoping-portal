import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./category.css";

export default function Category({ category }) {
  const { imageUrl, title, price, key } = category;
  const { addToCart } = useContext(CarContext);

  const addTocartHandler = () => {
    addToCart(category);
    console.log(category);
  };

  return (
    <div className="card" key={key}>
      <img src={imageUrl} alt="Denim Jeans" style={{ width: "100%" }} />

      <div className="category-container">
        <div className="category-body-container">
          <h2>{title}</h2>
          <p className="price">${price}</p>
          <p>
            <button onClick={addTocartHandler}>Add to Cart</button>
          </p>
        </div>
      </div>
    </div>
  );
}
