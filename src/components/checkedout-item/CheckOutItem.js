import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./CheckOutitem.css";

export default function CheckOutItem({ cartItem }) {
  const { title, imageUrl, price, quantity, id, _id } = cartItem;
  const { decreaseFromCart } = useContext(CarContext);
  const { addToCart } = useContext(CarContext);
  return (
    <tr>
      <td>
        <img className="checkOut" src={imageUrl}></img>
      </td>
      <td>{title}</td>
      <td>
        <span className="quantity">
          <div className="arrow" onClick={() => decreaseFromCart(cartItem)}>
            &#10094;
          </div>
          <span className="value">{quantity}</span>
          <div
            className="arrow"
            onClick={() => addToCart({ title, imageUrl, price, id })}
          >
            &#10095;
          </div>
          &nbsp;&nbsp;* ${price}
        </span>
      </td>
      <td>${price * quantity}</td>
    </tr>
  );
}
