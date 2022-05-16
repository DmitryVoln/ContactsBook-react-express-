import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import { UserContacts } from "./pages/userContacts/userContacts";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { APP_TOKEN } from "constants/authConstants";
import PrivateRoute from "components/PrivateRoure";

const App = () => {
  const { authData } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    localStorage.setItem(APP_TOKEN, authData.token);
  }, [authData]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          authData.token ? (
            <Navigate to="/contacts" />
          ) : (
            <Login />
          )
        }
      />
      {/* <PrivateRoute> */}
      <Route path="/contacts" element={<UserContacts userId={authData.userId} />} />
      {/* </PrivateRoute> */}
    </Routes>
  );
};

export default App;
