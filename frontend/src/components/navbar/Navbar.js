import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { searchBlogAction } from "../../redux/action";
const Navbar = () => {
  const navigate = useNavigate();
  const locatStorageData = localStorage.getItem("loginUserData");
  const localStorageObjectData = JSON.parse(locatStorageData);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const logoutUser = () => {
    localStorage.removeItem("loginUserData");
    navigate("/login");
  };
  const sendSearchDataOnRedux = async (e) => {
    setSearchValue(e.target.value);
    dispatch(searchBlogAction(e.target.value));
    navigate("/")
  };
  return (
    <div className="Navbar_MainDiv">
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
        <input
          type="text"
          placeholder="Search here"
          className="navbar_Search_Input"
          value={searchValue}
          onChange={sendSearchDataOnRedux}
        />
      </nav>
    </div>
  );
};

export default Navbar;
