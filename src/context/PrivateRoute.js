import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const user = useAuth();
  const token = localStorage.getItem("authToken");
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
