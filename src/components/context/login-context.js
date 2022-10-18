import { createContext, useState } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  jwtToken: "",
  setJwtToken: () => {},
  userEmail: "",
  setUserEmail: () => {},
});

export const LoginProvider = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const email = localStorage.getItem("email");
  const [isLoggedIn, setIsLoggedIn] = useState(token === null ? false : true);
  const [jwtToken, setJwtToken] = useState(token);
  const [userEmail, setUserEmail] = useState(email);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    jwtToken,
    setJwtToken,
    userEmail,
    setUserEmail,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
