import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { requestContacts } from "redux/reducers/ActionCreators";
import { Login } from "./components/Login/Login";
import { UserContacts } from "./components/UserContacts/UserContacts";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const handleLogin = () => { 
    setIsAuthed((isAuthed) => !isAuthed);
  };

  const handleLogout = () => {
    console.log(isAuthed);
    setIsAuthed((p) => !p);
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthed ? (
            <Navigate to="/contacts" />
          ) : (
            <Login onClick={handleLogin} />
          )
        }
      />
      <Route path="/contacts" element={<UserContacts handleLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;
