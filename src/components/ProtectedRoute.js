import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Ensure this matches the token key used during login

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
