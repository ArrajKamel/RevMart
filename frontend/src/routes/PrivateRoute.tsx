import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
