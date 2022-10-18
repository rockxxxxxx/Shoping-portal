import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./login-context";

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
  const [getCall, setGetCall] = useState(false);

  let email = "";
  if (userEmail != null) {
    email = userEmail.replace(/[@.]/g, (m) => chars[m]);
  }

  const removeFromCart = (id) => {
    setGetCall(true);
    axios.delete(
      `https://crudcrud.com/api/7eb50c5310244450b1dca1a6a7097b9c/carts${email}/${id}`
    );
  };

  let productUpdate = { p_id: "", quantity: 1 };
  const addToCart = (product) => {
    setGetCall(true);
    if (cartItems.length !== 0) {
      cartItems.map((item) => {
        if (item.id === product.id) {
          productUpdate.quantity = item.quantity + 1;
          productUpdate.p_id = item._id;
        }
        return { product };
      });
    }
    if (productUpdate.p_id === "") {
      axios.post(
        `https://crudcrud.com/api/7eb50c5310244450b1dca1a6a7097b9c/carts${email}`,
        { ...product, quantity: productUpdate.quantity }
      );
    } else {
      axios.put(
        `https://crudcrud.com/api/7eb50c5310244450b1dca1a6a7097b9c/carts${email}/${productUpdate.p_id}/`,
        { ...product, quantity: productUpdate.quantity }
      );
    }

    console.log(cartItems);
  };

  useEffect(() => {
    setGetCall(false);
    if (userEmail !== null && setGetCall !== false) {
      axios
        .get(
          `https://crudcrud.com/api/7eb50c5310244450b1dca1a6a7097b9c/carts${email}`
        )
        .then((res) => {
          setCartItems(res.data);
          console.log(res.data[0].id);
        });
    }
    console.log(cartItems);
  }, [getCall, userEmail, email]);

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
