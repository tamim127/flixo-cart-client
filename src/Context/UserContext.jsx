"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export const UserProvider = ({ children }) => {
    const { currentUser } = useAuth();
    console.log(currentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userData = {
        firstName: currentUser.displayName?.split(" ")?.[0] || "",
        lastName: currentUser.displayName?.split(" ")?.[1] || "",
        email: currentUser.email,
        phone: currentUser.phoneNumber || "",
        avatar: currentUser.photoURL || "/images/default-avatar.png",
        defaultAddress: "",
      };
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [currentUser]);

  const updateUser = (data) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
