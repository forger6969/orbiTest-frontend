import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registed from "./pages/Registed";
import SingUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import { AppContext } from "./context/AppContext";
import TestStart from "./pages/TestStart";

const App = () => {

  const [userData , setData] = useState(null)

  return (
    <AppContext.Provider value={{userData , setData}}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
      />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/Register"
          element={
            <PublicRoute>
              <Registed />
            </PublicRoute>
          }
        />
        <Route
          path="/SingUp"
          element={
            <PublicRoute>
              <SingUp />
            </PublicRoute>
          }
        />
        <Route
          path="/Dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/test/:id"
        element={
          <PrivateRoute>
            <TestStart/>
          </PrivateRoute>
        }
        />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
