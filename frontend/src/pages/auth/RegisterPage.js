import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { register } from "../../services/api";
import "./Auth.css";
const RegisterPage = () => {
    const navigate = useNavigate()
  const [userDetail, setUserDetail] = useState({
    name: "",
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
  const registerUser = async(e) => {
    e.preventDefault();
    const result = await register(userDetail)
    if(result.error)
    {
      swal("Error", result.error, "error");
      return
    }
    if(result.userExist)
    {
        swal("Exist", "user already exist with these credentials", "warning");
        return
    }
    if(result)
    {
        swal("Successfully", "user register successfully", "success");
        setUserDetail({})
        navigate("/login")

    }
    
  };

  return (
    <section className="authSection">
      <form onSubmit={registerUser}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={userDetail.name}
            onChange={inputEvent}
            name="name"
            placeholder="Type Name ..."
            autocomplete="off"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={userDetail.email}
            onChange={inputEvent}
            name="email"
            placeholder="Type Email ... *"
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
            placeholder = "Type Password ... *"
            name="password"
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
          <NavLink to ="/login">Already exist, Login ! </NavLink>
      </div>
    </section>
  );
};

export default RegisterPage;