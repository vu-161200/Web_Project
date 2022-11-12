import React from "react";
import Loading from "../layout/loading/loading";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated === false) return <Navigate to={"/login"} replace />;

  if (isAdmin === true && user.role !== "admin")
    return <Navigate to={"/login"} replace />;

  return children;
};

export default ProtectedRoute;
