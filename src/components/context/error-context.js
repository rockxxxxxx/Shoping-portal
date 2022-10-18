import { createContext, useState } from "react";

export const ErrorContext = createContext({
  isToaster: false,
  setIsToaster: () => {},
  isMessage: "",
  setIsMessage: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [isToaster, setIsToaster] = useState(false);
  const [isMessage, setIsMessage] = useState("");

  const value = {
    isToaster,
    setIsToaster,
    isMessage,
    setIsMessage,
  };
  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
