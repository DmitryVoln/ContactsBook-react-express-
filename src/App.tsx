import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import { UserContacts } from "./pages/userContacts/userContacts";
import { useAppSelector } from "./hooks/redux";
import { APP_TOKEN, USER_ID } from "constants/authConstants";
import PrivateRoute from "components/PrivateRoure";

const App = () => {
  const { authData } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const token = localStorage.getItem(APP_TOKEN);
    console.log(token);
    if (!token) {
      localStorage.setItem(APP_TOKEN, authData.token);
      localStorage.setItem(USER_ID, String(authData.userId));
    }
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
        <Route element={<PrivateRoute />}>
          <Route path="/contacts" element={<UserContacts />} />
        </Route>
    </Routes>
  );
};

export default App;
