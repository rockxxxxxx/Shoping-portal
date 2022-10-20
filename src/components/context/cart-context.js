import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/login-context";
import { ErrorContext } from "./error-context";

const chars = { "@": "", ".": "" };
axios.defaults.baseURL =
  "https://cloth-shopping-portal-default-rtdb.firebaseio.com";

export const CarContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: "",
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
  decreaseFromCart: () => {},
  cartTotal: 0,
  addingLoader: [],
  setAddingLoader: () => {},
});
let loadedData = [];
function pushData(data) {
  for (const key in data) {
    loadedData.push({
      fireBaseId: key,
      id: data[key].id,
      title: data[key].title,
      imageUrl: data[key].imageUrl,
      price: data[key].price,
      quantity: data[key].quantity,
    });
  }
}

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
    await axios.delete(`/carts${email}/${_id}.json`);
    const updateItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updateItems);
    setIsMessage("Item deleted successfully");
    setIsToaster(true);
  };

  const decreaseFromCart = async (item) => {
    const { quantity, id, fireBaseId } = item;
    if (quantity === 1) {
      removeFromCart(fireBaseId, id);
    } else {
      try {
        await axios.patch(`carts${email}/${fireBaseId}.json`, {
          quantity: quantity - 1,
        });
        const getRequest = await axios.get(`/carts${email}.json`);
        loadedData = [];
        pushData(getRequest.data);
        setCartItems(loadedData);
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
          productUpdate.p_id = item.fireBaseId;
        }
        return { productUpdate };
      });
    }

    try {
      if (productUpdate.p_id === "") {
        await axios.post(`/carts${email}.json`, {
          ...product,
          quantity: productUpdate.quantity,
        });
      } else {
        await axios.patch(`/carts${email}/${productUpdate.p_id}.json`, {
          quantity: productUpdate.quantity,
        });
      }
      const getRequest = await axios.get(`/carts${email}.json`);
      loadedData = [];
      pushData(getRequest.data);
      setCartItems(loadedData);
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
        const getRequest = await axios.get(`/carts${email}.json`);
        loadedData = [];
        pushData(getRequest.data);
        setCartItems(loadedData);
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
