import React from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  let currentPath = useLocation();

  return (
    <>
      <div className="container-fluid bg-light">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <NavLink className="navbar-brand" to="/">
            Uni-Forum
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/posts/${user.userNum}`}>
                  My Posts
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About me
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink className="dropdown-item" to="/activity/">
                      My Activity
                    </NavLink>
                  </li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/login">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            {/* {currentPath.pathname === "/home" ? (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button className="btn btn-outline" type="submit">
                  Search
                </button>
              </form>
            ) : (
              <></>
            )} */}

            <span className="text-end">{user.firstName}</span>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
