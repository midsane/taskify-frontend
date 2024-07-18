import { createContext, useState } from "react";

export const Context = createContext({
  theme: "",
  setTheme: () => {},
});

export default function ContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const CntxValue = {
    theme,
    setTheme,
  };
  return <Context.Provider value={CntxValue}>{children}</Context.Provider>;
}
