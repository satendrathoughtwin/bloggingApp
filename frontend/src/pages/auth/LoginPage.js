import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { login } from "../../services/api";
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
      const newResult = result.data;
      swal("Successfully", "user login successfully", "success");
      localStorage.setItem("loginUserData", JSON.stringify(newResult));
      setUserDetail({});
      navigate("/userProfile");
    }
  };

  return (
    <section className="authSection">
      <header>Login</header>
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
            autoComplete="off"
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
            minLength="5"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="cancel" onClick={()=>navigate("/")}>cancel</button>
        </div>
      </form>
      <div>
        <NavLink to="/register">Not Registered, Register ! </NavLink>
        <NavLink to="/forgetPassword">Forget, Password ? </NavLink>
      </div>
    </section>
  );
};

export default LoginPage;
