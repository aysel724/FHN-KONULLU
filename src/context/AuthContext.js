import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// Create a Context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      const token = localStorage.getItem("authToken");
      var exp = jwtDecode(token).exp * 1000;
      var expDate = new Date(exp);
      var lastDate = new Date();
      lastDate.setDate(lastDate.getDate() + 5);
      lastDate.setMinutes(lastDate.getMinutes() - 1);
      console.log(expDate, lastDate);
      if (lastDate > expDate) {
        console.log("Hello");
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
