import { createContext, useContext } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext); 
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
      const storedUser = localStorage.getItem("chat-user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Error parsing user data from localStorage:", e);
          localStorage.removeItem("chat-user");
          return null; // Handle the case where parsing fails
        }
      }
      return null; // No user data in localStorage
    });
  
    return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
      </AuthContext.Provider>
    );
  };