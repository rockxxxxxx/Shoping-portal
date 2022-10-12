import React, { useContext } from "react";
import { CarContext } from "../context/cart-context";
import "./cart-item.css";

export default function CartItem({ cartItem,deleteItem }) {
  const { title, imageUrl, price, quantity,id } = cartItem;
  const {removeFromCart} = useContext(CarContext)
 
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${title}`} />
      <div className="item-details">
        <span className="name" style={{ display: "inlin-block" }}>
          {`${title} `}{" "}
          <i class="delete red icon" style={{ cursor: "pointer" }} id = {id} onClick={()=>removeFromCart(id)}></i>
        </span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}
