import React from "react";
import { useNavigate } from "react-router-dom";
const OTPVerificationComponent = ({
  otpVarification,
  otp,
  setUserDetail,
}) => {
  const navigate = useNavigate();
  return (
    <section className="authSection">
      <header>OTP Verification</header>

      <form onSubmit={otpVarification}>
        <div>
          <label>OPT</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setUserDetail({ otp: e.target.value })}
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

export default OTPVerificationComponent;
