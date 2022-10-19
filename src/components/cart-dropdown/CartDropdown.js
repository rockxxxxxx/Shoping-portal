import React, { useContext } from "react";
import "./cart-dropdown.css";
import CartItem from "../cart-item/CartItem";
import { CarContext } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CarContext);
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <button onClick={navigateToCheckout}>Checkout</button>
      </div>
    </div>
  );
}
