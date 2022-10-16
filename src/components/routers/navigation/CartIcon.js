import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../../assests/shopping-bag.svg";
import { CarContext } from "../../context/cart-context";
import "./CartIcon.css";
import CartDropdown from "../../cart-dropdown/CartDropdown";

export default function CartIcon() {
  const { isCartOpen, cartCount, setIsCartOpen } = useContext(CarContext);

  const mangeCartDropdwn = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="cart-icon-container" onClick={mangeCartDropdwn}>
        <ShoppingIcon className="shopping-icon" onClick={mangeCartDropdwn} />
        <span className="item-count">{cartCount}</span>
      </div>
      {isCartOpen && <CartDropdown />}
    </>
  );
}
