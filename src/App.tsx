import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import { UserContacts } from "./pages/userContacts/userContacts";
import { useAppSelector } from "./hooks/redux";
import { APP_TOKEN } from "constants/authConstants";
import PrivateRoute from "components/PrivateRoure";

const App = () => {
  const { authData } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    console.log(authData)
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
        <Route element={<PrivateRoute />}>
          <Route path="/contacts" element={<UserContacts userId={authData.userId}/>} />
        </Route>
    </Routes>
  );
};

export default App;
