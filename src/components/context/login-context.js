import { createContext, useState } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  jwtToken: "",
  setJwtToken: () => {},
});

export const LoginProvider = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  console.log(token);
  const [isLoggedIn, setIsLoggedIn] = useState(token === null ? false : true);
  const [jwtToken, setJwtToken] = useState(token);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    jwtToken,
    setJwtToken,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
