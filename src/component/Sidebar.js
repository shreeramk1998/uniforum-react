import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fab fa-forumbee"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>UNI Forum</span></div>
                </a>
                <hr className="sidebar-divider my-0"/>
                <ul className="navbar-nav text-light" id="accordionSidebar">
                   <li className="nav-item"><NavLink className="nav-link" to="/home"><i className="fas fa-tachometer-alt"></i><span>Home</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/profile"><i className="fas fa-user"></i><span>Profile</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/myposts"><i className="far fa-user-circle"></i><span>My Posts</span></NavLink></li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
  )
}

export default Sidebar