import { createContext, useState } from "react";

const cartElements = [
    {
      id: 1,
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },

    {
      id: 2,
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },

    {
      id: 3,
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ];

export const CarContext = createContext(
    {
        isCartOpen:false,
        setIsCartOpen:()=>{},
        cartItems:'mbjjbj',
        addToCart:()=>{},
        removeFromCart:()=>{}
    }
)


export const CartProvider = ({children})=>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const[cartItems,setCartItems] = useState(cartElements)

    const removeFromCart =(id)=>{
        const updateItems = cartItems.filter((item)=>item.id!==id)
        setCartItems(updateItems)
        
    }

    const value = {isCartOpen,setIsCartOpen,cartItems,setCartItems,removeFromCart};
    return(
        <CarContext.Provider value={ value}>
            {children}
        </CarContext.Provider>
    )
}