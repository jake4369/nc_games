import { createContext, useState } from "react";

export const IsLoadedContext = createContext();

export const IsLoadedProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <IsLoadedContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </IsLoadedContext.Provider>
  );
};
