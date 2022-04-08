import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const locatStorageData = localStorage.getItem("loginUserData");
  const localStorageObjectData = JSON.parse(locatStorageData);
  const logoutUser = () => {
    localStorage.removeItem("loginUserData");
    navigate("/login")
  };
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/blog">Blog</NavLink>

        {localStorageObjectData ? (
          <>
            <NavLink to="/userProfile">{localStorageObjectData.name}</NavLink>
            <button onClick={() => logoutUser()}>logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
