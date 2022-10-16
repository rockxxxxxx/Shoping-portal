import { createContext, useState } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  jwtToken: "",
  setJwtToken: () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
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
