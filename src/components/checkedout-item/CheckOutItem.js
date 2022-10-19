import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./CheckOutitem.css";

export default function CheckOutItem({ cartItem }) {
  const { title, imageUrl, price, quantity, id } = cartItem;
  const { decreaseFromCart } = useContext(CarContext);
  const { addToCart } = useContext(CarContext);
  return (
    <tr>
      <td>
        <img className="checkOut" src={imageUrl} alt={title}></img>
      </td>
      <td>{title}</td>
      <td>
        <span className="quantity">
          <div className="arrow" onClick={() => decreaseFromCart(cartItem)}>
            <i class="chevron circle down icon" />
          </div>
          <span className="value">
            <b>{quantity}</b>
          </span>
          <div
            className="arrow"
            onClick={() => addToCart({ title, imageUrl, price, id })}
          >
            <i class="chevron circle up icon" />
          </div>
          &nbsp;&nbsp;
          <i class="times icon" />{" "}
          <i class="dollar sign icon">
            <b>{price}</b>
          </i>
        </span>
      </td>
      <td>
        <i class="dollar sign icon">
          <b>{price * quantity}</b>
        </i>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </td>
    </tr>
  );
}
