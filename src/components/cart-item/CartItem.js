import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./cart-item.css";

export default function CartItem({ cartItem, deleteItem }) {
  const { title, imageUrl, price, quantity, id, fireBaseId } = cartItem;
  const { removeFromCart } = useContext(CarContext);

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${title}`} />
      <div className="item-details">
        <span className="name" style={{ display: "inline-block" }}>
          {`${title} `}{" "}
          <i
            class="delete red icon"
            style={{ cursor: "pointer" }}
            id={fireBaseId}
            onClick={() => removeFromCart(fireBaseId, id)}
          ></i>
        </span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}
