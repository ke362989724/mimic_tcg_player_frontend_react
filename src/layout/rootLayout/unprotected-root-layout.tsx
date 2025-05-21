import React from "react";
import useAuth from "@/custom-hook/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const UnprotectedRouteLayout = () => {
  const isLogin = useAuth();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnprotectedRouteLayout;
