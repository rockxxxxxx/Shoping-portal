import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/login-context";
import { ErrorContext } from "./error-context";

const chars = { "@": "", ".": "" };
axios.defaults.baseURL =
  "https://crudcrud.com/api/301e70bf4b2a45c68d958f5cd90e9162";

export const CarContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: "",
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
  decreaseFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { userEmail } = useContext(LoginContext);
  const [cartTotal, setCartTotal] = useState(0);
  const { setIsMessage, setIsToaster } = useContext(ErrorContext);

  let email = "";
  if (userEmail != null) {
    email = userEmail.replace(/[@.]/g, (m) => chars[m]);
  }

  const removeFromCart = async (_id, id) => {
    await axios.delete(`/carts${email}/${_id}`);
    const updateItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updateItems);
    setIsMessage("Item deleted successfully");
    setIsToaster(true);
  };

  const decreaseFromCart = async (item) => {
    const { id, imageUrl, title, quantity, price } = item;
    if (item.quantity === 1) {
      removeFromCart(item._id, item.id);
    } else {
      try {
        await axios.put(`carts${email}/${item._id}`, {
          id,
          imageUrl,
          title,
          quantity: quantity - 1,
          price,
        });
        const getRequest = await axios.get(`/carts${email}`);
        setCartItems(getRequest.data);
        setIsMessage("Quantity reduced successfully");
        setIsToaster(true);
      } catch (error) {
        setIsMessage("Something went wrong! Please Retry");
        setIsToaster(true);
      }
    }
  };

  const addToCart = async (product) => {
    let productUpdate = { p_id: "", quantity: 1 };
    if (cartItems.length !== 0) {
      cartItems.map((item) => {
        if (item.id === product.id) {
          productUpdate.quantity = item.quantity + 1;
          productUpdate.p_id = item._id;
        }
        return { productUpdate };
      });
    }

    try {
      if (productUpdate.p_id === "") {
        await axios.post(`/carts${email}`, {
          ...product,
          quantity: productUpdate.quantity,
        });
      } else {
        await axios.put(`/carts${email}/${productUpdate.p_id}`, {
          ...product,
          quantity: productUpdate.quantity,
        });
      }
      const getRequest = await axios.get(`/carts${email}`);
      setCartItems(getRequest.data);
      setIsMessage("Item added to cart successfully");
      setIsToaster(true);
    } catch (error) {
      console.log(error);
    }
    console.log(cartItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRequest = await axios.get(`/carts${email}`);
        setCartItems(getRequest.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, currentElement) => total + currentElement.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    removeFromCart,
    addToCart,
    cartCount,
    decreaseFromCart,
    cartTotal,
  };
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};
