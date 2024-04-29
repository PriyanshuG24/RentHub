// import React from 'react'

// function ForgetPassword() {
//   return (
//     <div>
//       <h1>ForgetPassword</h1>
//     </div>
//   )
// }

// export default ForgetPassword

import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent. Please check your email inbox.');
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again later.');
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            value={email}
            id="email"
            onChange={onChange}
            required
          />
          <Link to='/signin' className="forgotPasswordLink">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgetPassword;
