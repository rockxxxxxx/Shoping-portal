import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./category.css";

export default function Category({ category }) {
  const { imageUrl, title, price, id } = category;
  const { addToCart, cartItems } = useContext(CarContext);

  const addTocartHandler = () => {
    addToCart(category);
    console.log(category);
  };

  return (
    <div className="card" key={id}>
      <img src={imageUrl} alt="Denim Jeans" style={{ width: "100%" }} />

      <div className="category-container">
        <div className="category-body-container">
          <h2>{title}</h2>
          <p className="price">${price}</p>
          <p>
            {!cartItems.find((e) => e.id === id) && (
              <button onClick={addTocartHandler}>Add to cart</button>
            )}
            {cartItems.find((e) => e.id === id) && (
              <button
                style={{
                  backgroundColor: "white",
                  pointerEvents: "none",
                  cursor: "not-allowed",
                  border: "1px black",
                }}
              >
                <i class="check green icon">Added</i>
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
