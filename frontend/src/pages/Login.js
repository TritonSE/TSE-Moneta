import React, { useState } from "react";
import "../css/Login.css";

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(event.target.username.value);
  console.log(event.target.password.value);
  console.log("submit");
};

function Login() {
  return (
    <>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="login-input-container">
            <label>Username </label>
            <input type="text" name="username" required />
          </div>
          <div className="login-input-container">
            <label>Password </label>
            <input type="password" name="password" required />
          </div>
          <div className="login-submit-button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
