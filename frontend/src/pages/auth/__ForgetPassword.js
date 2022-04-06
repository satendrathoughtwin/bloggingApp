import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  email_Number_Varification,
  OTPVarification,
} from "../../services/api";
import swal from "sweetalert";
const ForgetPasswordPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [isEmailVarification, setIsEmailVerification] = useState(false);
  const [isVarificationOTP, setIsVerificationOTP] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: "",
    number: null,
    password: "",
    rePassword: "",
    otp: null,
  });

  const emailVarification = async (e) => {
    e.preventDefault();
    // const { email, number } = userDetail;
    // const body = { email, number };
    // const result = await email_Number_Varification(body);
    // if (result) {
    //   setIsEmailVerification(true);
    // }
  };
  const otpVarification = async (e) => {
    e.preventDefault();
    const { otp } = userDetail;
    const body = { otp };
    const result = await OTPVarification(body);
    if (result) {
      setIsVerificationOTP(true);
    }
  };
  const forgetPassword = async (e) => {
    e.preventDefault();
    const { password, rePassword } = userDetail;
    if (password !== rePassword) {
      swal("Wrong", "Password Missmatchecd", "error");
    } else {
      const { otp } = userDetail;
      const body = { otp };
      const result = await changePassword(body);
      if (result) {
        await swal("Succes", "Password HasChanged Successfully", "success");
        navigate("/login");
      }
    }
  };
  const navigate = useNavigate();

  const EmailVerificationComponent = () => {
    return (
      <section className="authSection">
        <header>Email Verification</header>
        <div className="authSection_confirmationDiv">
          <button
            onClick={() => {
              setIsShow(!isShow);
              setUserDetail({ email: "", number: null });
            }}
          >
            Email
          </button>
          <button
            onClick={() => {
              setIsShow(!isShow);
              setUserDetail({ email: "", number: null });
            }}
          >
            Number
          </button>
        </div>
        <form onSubmit={emailVarification}>
          {isShow ? (
            <div>
              <label>Email</label>
              <input
                type="text"
                value={userDetail.email}
                onChange={(e) => setUserDetail({ email: e.target.value })}
                name="email"
                placeholder="Type Here ... *"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                required
                autocomplete="off"
              />
            </div>
          ) : (
            <div>
              <label>Number</label>
              <input
                type="number"
                value={userDetail.number}
                onChange={(e) => setUserDetail({ number: e.target.value })}
                name="number"
                placeholder="Type Here ... *"
                minLength={10}
                maxLength={12}
                required
                autocomplete="off"
              />
            </div>
          )}

          <div>
            <button type="submit">Send</button>
            <button onClick={() => navigate("/login")}>cancel</button>
          </div>
        </form>
      </section>
    );
  };

  const OTPVerificationComponent = () => {
    return (
      <section className="authSection">
        <header>OTP Verification</header>

        <form onSubmit={otpVarification}>
          <div>
            <label>OPT</label>
            <input
              type="number"
              value={userDetail.number}
              onChange={(e) => setUserDetail({ number: e.target.value })}
              name="otp"
              placeholder="Type Here ... *"
              minLength={10}
              maxLength={12}
              required
              autocomplete="off"
            />
          </div>

          <div>
            <button type="submit">Send</button>
            <button onClick={() => navigate("/login")}>cancel</button>
          </div>
        </form>
      </section>
    );
  };

  const ForgetPasswordComponent = () => {
    return (
      <section className="authSection">
        <header>Change Password</header>
        <form onSubmit={forgetPassword}>
          <div>
            <label> New Password</label>
            <input
              type="password"
              value={userDetail.password}
              onChange={(e) => setUserDetail({ password: e.target.value })}
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
              value={userDetail.rePassword}
              onChange={(e) => setUserDetail({ password: e.target.value })}
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
      </section>
    );
  };
  return (
    <>
      {/* {!isEmailVarification ? (
        <EmailVerificationComponent />
      ) : !isVarificationOTP ? (
        <OTPVerificationComponent />
      ) : (
        <ForgetPasswordComponent />
      )} */}

<EmailVerificationComponent />
    </>
  );
};

export default ForgetPasswordPage;
