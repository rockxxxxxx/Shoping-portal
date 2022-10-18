import React, { useContext } from "react";
import "./checkout.css";
import { CarContext } from "../context/cart-context";
import CheckOutItem from "../checkedout-item/CheckOutItem";

export default function () {
  const { cartItems, addToCart, cartTotal } = useContext(CarContext);
  const addTocartHandler = (item) => {
    addToCart(item);
    console.log(item);
  };
  return (
    <>
      <table id="customers">
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Quantity </th>
          <th>Price</th>
        </tr>

        {cartItems.map((cartItem) => (
          <CheckOutItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </table>
      <h1
        style={{
          textAlign: "right",
          width: "50%",
          marginBottom: "150px",
          marginTop: "100px",
        }}
      >
        Total: ${cartTotal}
      </h1>
    </>
  );
}
