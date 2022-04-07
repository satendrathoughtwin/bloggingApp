import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerificationComponent = ({
  setUserDetail,
  emailVarification,
  email,
  number,
}) => {
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();
  return (
    <section className="authSection">
      <header>Email Verification</header>
      <div className="authSection_confirmationDiv">
       
        <button
          onClick={() => {
            setIsShow(true);
            setUserDetail({ email: "", number: null });
          }}
        >
          Email
        </button>
        <button
          onClick={() => {
            setIsShow(false);
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
              value={email}
              onChange={(e) => setUserDetail({ email: e.target.value })}
              name="email"
              placeholder="Type Here ... *"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              required
              autoComplete="off"
            />
          </div>
        ) : (
          <div>
            <label>Number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setUserDetail({ number: e.target.value })}
              name="number"
              placeholder="Type Here ... *"
              minLength={10}
              maxLength={12}
              required
              autoComplete="off"
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
export { EmailVerificationComponent };
