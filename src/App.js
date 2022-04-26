import React from "react";
import Test from "./component/Test";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import MyPosts from "./component/MyPosts";
import Profile from "./component/Profile";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Login from "./component/Login";

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
