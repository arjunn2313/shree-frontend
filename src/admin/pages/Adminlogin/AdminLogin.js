import React, { useState } from "react";
import SignInForm from "./signIn";
import SignUpForm from "./signUp";
import "./login.css";

export default function AdminLogin() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container-admin-login " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="admin-login">
      <h2 className="text-center">Admin Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Login with your personal info</p>
              <button
                className="ghost admin-login-button "
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>New Admin ?</h1>
              <p className="form-p">
                Enter your personal details and request for verification
              </p>
              <button
                className="ghost admin-login-button "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
