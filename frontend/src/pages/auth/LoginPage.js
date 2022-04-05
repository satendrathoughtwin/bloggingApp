import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { login, register } from "../../services/api";
import "./Auth.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const inputEvent = async (e) => {
    const { name, value } = e.target;
    setUserDetail((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const result = await login(userDetail);
    if (result.wrongCredential) {
      swal("Error", result.message, "error");
      return;
    }

    if (result) {
    const newResult = result.data.result.result;
    const newToken = result.data.result.token;

      swal("Successfully", "user login successfully", "success");
      localStorage.setItem("loginUserData", JSON.stringify(newResult));
      localStorage.setItem("loginUserToken", JSON.stringify(newToken));
      setUserDetail({});
      navigate("/userProfile");
    }
  };

  return (
    <section className="authSection">
      <form onSubmit={loginUser}>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={userDetail.email}
            onChange={inputEvent}
            name="email"
            placeholder="Type Email ... *"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={userDetail.password}
            onChange={inputEvent}
            placeholder="Type Password ... *"
            name="password"
            minlength="5"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="cancel">cancel</button>
        </div>
      </form>
      <div>
        <NavLink to="/register">Not Registered, Register ! </NavLink>
      </div>
    </section>
  );
};

export default LoginPage;
