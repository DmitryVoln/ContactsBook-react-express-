import React from "react";
import { Navigate, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { APP_TOKEN } from "constants/authConstants";

interface IProps extends RouteProps {
  children: React.ReactElement;
  [key: string]: any;
}

const PrivateRoute = ({ children, ...rest }: IProps) => {
  const isAuthed = localStorage.getItem(APP_TOKEN);

  return isAuthed ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
