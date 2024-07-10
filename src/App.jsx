import React from "react";
import User from "./views/User";
import Product from "./views/Product";
import { Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";

export default function App() {
  return (
    <div>
      {/* <User /> */}
      {/* <Product /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
