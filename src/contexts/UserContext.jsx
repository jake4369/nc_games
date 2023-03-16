import { createContext } from "react";
import { useState } from "react";
import defaultImg from "./../assets/defaultProfilePic.png";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "guest user",
    name: "guest",
    avatar_url: defaultImg,
  });

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
