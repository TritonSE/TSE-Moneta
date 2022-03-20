import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

/**
 * Renders login page
 * @author Kevin Fu
 * @author Navid Boloorian
 */
function Login() {
  const navigate = useNavigate();

  /**
   * Posts data to server and handles response
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email: event.target.email.value, password: event.target.password.value };
    const result = await fetch("http://localhost:8082/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    if (result.status === 200) {
      console.log("Logged in!");
      navigate("/");
    } else if (result.status === 404) {
      console.log("Email not found!");
    } else if (result.status === 400) {
      console.log("Invalid Password!");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label htmlFor="login-email">
            Email
            <input type="text" name="email" required />
          </label>
        </div>
        <div className="login-input-container">
          <label htmlFor="login-password">
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <div className="login-submit-button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
