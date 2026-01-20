import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registed from "./pages/Registed";
import SingUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Registed />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
