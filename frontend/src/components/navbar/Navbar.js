import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/userProfile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
