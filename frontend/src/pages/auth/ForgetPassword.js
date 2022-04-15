import React, { useState } from "react";
import {
  changePassword,
  email_Number_Varification,
  OTPVarification,
} from "../../services/api";
import { EmailVerificationComponent } from "./EmailVerificationComponent";
import ForgetPasswordComponent from "./ForgetPasswordComponent";
import OTPVerificationComponent from "./OTPVerificationComponent";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
const ForgetPassword = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    number: "",
    password: "",
    rePassword: "",
    otp: "",
  });
  const [userId, setUserId] = useState("");
  const [isEmailVarification, setIsEmailVerification] = useState(false);
  const [isVarificationOTP, setIsVerificationOTP] = useState(false);
  const [loader, setLoader] = useState(false);

  const inputEvent = async (e) => {
    const { name, value } = e.target;
    setUserDetail((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const emailVarification = async (e) => {
    await setLoader(true);
    e.preventDefault();
    const { email, number } = userDetail;
    if (email) setUserId(email);
    if (number) setUserId(parseInt(number));
    const body = { email, number };
    const result = await email_Number_Varification(body);
    if (result.isProceed) {
      await setLoader(false);
      setIsEmailVerification(true);
      setUserDetail({ email: "", number: "" });
    } else {
      email
        ? swal("Not Found", "Email is not registerd", "info")
        : swal("Not Found", "Number is not registered");
      navigate(-1);
    }
  };

  const otpVarification = async (e) => {
    e.preventDefault();
    const { otp } = userDetail;
    const body = { otp };
    const result = await OTPVarification(body);
    if (result) {
      setIsVerificationOTP(true);
    } else {
      swal("Failed", "You entered Wrong Otp", "error");
    }
  };
  const forgetPassword = async (e) => {
    e.preventDefault();
    const { password, rePassword } = userDetail;
    console.log(`password : ${password} repassword ${rePassword}`);
    if (password !== rePassword) {
      swal("Wrong", "Password Missmatchecd", "error");
    } else {
      const body = { password, rePassword, userId };
      const result = await changePassword(body);
      if (result) {
        await swal("Succes", "Password Has Changed Successfully", "success");
        navigate("/login");
      }
    }
  };
  const navigate = useNavigate();

  return (
    <>
      {loader ? (
        <section className="authSection ">
          <header>Wait ...</header>
          <div className="loaderDiv">
            <Audio height="100" width="100" color="red" ariaLabel="loading" />
          </div>
        </section>
      ) : !isEmailVarification ? (
        <EmailVerificationComponent
          email={userDetail.email}
          number={userDetail.number}
          inputEvent={inputEvent}
          setUserDetail={setUserDetail}
          emailVarification={emailVarification}
        />
      ) : !isVarificationOTP ? (
        <OTPVerificationComponent
          otpVarification={otpVarification}
          otp={userDetail.otp}
          setUserDetail={setUserDetail}
        />
      ) : (
        <ForgetPasswordComponent
          forgetPassword={forgetPassword}
          password={userDetail.password}
          rePassword={userDetail.rePassword}
          inputEvent={inputEvent}
        />
      )}
    </>
  );
};

export default ForgetPassword;
