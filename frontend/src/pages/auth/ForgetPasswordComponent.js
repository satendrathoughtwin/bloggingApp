import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordComponent = ({forgetPassword,password,rePassword,inputEvent}) => {
  const navigate = useNavigate();
    return (
      <section className="authSection">
        <header>Change Password</header>
        <form onSubmit={forgetPassword}>
          <div>
            <label> New Password</label>
            <input
              type="password"
              value={password}
              onChange={inputEvent}
              placeholder="Type Password ... *"
              name="password"
              minlength="5"
              required
              autocomplete="off"
            />
          </div>
          <div>
            <label> Re - Password</label>
            <input
              type="password"
              value={rePassword}
              onChange={inputEvent}
              placeholder="Type Password ... *"
              name="rePassword"
              minlength="5"
              required
              autocomplete="off"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="cancel" onClick={()=>navigate('/login')}>cancel</button>
          </div>
        </form>
      </section>
    );
  };

export default ForgetPasswordComponent;