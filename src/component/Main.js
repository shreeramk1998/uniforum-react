import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Login from "./Login";
import UserPost from "./UserPost";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Profile from "./Profile";
import { MetaDataContextProvider } from "../Context/UserContext";

function MainRoute() {
  return (
    <>
      <Routes>
        {/* default '/' redirection to '/home' */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/"
          element={
            <MetaDataContextProvider>
              <Navbar />
            </MetaDataContextProvider>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="/posts/:userNum" element={<UserPost />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>

        {/* <Route path="*"></Route> */}
      </Routes>
    </>
  );
}

export default MainRoute;
