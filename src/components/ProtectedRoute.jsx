import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { existingUserData } = useContext(AuthContext);

  if (!existingUserData) {
    return <Navigate to="/verify-code" replace />;
  }

  // If `existingUserData` is not null, render the component
  return element;
};

export default ProtectedRoute;
