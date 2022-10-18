import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./login-context";

const addCartItem = (cartItems, productToAdd) => {
  const existingQuantity = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (existingQuantity) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const chars = { "@": "", ".": "" };

export const CarContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: "",
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { userEmail } = useContext(LoginContext);
  const email = userEmail.replace(/[@.]/g, (m) => chars[m]);

  const removeFromCart = (id) => {
    const updateItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updateItems);
  };

  const addToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
    console.log(cartItems);
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, currentElement) => total + currentElement.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    removeFromCart,
    addToCart,
    cartCount,
  };
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};
