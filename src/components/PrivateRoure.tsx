import React from "react";
import { Navigate, Outlet } from "react-router";
import { APP_TOKEN } from "constants/authConstants";


const PrivateRoute = () => {
  const isAuthed = localStorage.getItem(APP_TOKEN);
  return isAuthed ? (
   <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
