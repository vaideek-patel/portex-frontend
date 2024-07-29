import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import SignUp from "../Components/SignUp/SignUp";

const Index: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Index;
