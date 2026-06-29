import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import ForgotPassword from "../page/ForgotPassword";
import BookDetail from "../page/BookDetail";
import Cart from "../page/Cart";
import MyRentals from "../page/MyRentals";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/my-rentals" element={<ProtectedRoute><MyRentals /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
