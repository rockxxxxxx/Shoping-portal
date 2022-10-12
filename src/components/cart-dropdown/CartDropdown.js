import React, { useContext } from "react";
import "./cart-dropdown.css";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
import { CarContext } from "../context/cart-context";

export default function CartDropdown() {
 const {cartItems} = useContext(CarContext);
  
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          return <CartItem cartItem={cartItem} />;
        })}
        <Button name="Go to checkout" />
      </div>
    </div>
  );
}
