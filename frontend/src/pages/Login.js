/**
 * Login page for orgs/approved users.
 *
 * @summary Login page.
 * @author Navid Boloorian
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebaseConfig";
import Logo from "../images/Logo.svg";

import "../css/Account.css";
import "../css/Login.css";

export default function Login() {
  const registerForm = React.useRef();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();

  const handleSnackClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  /**
   * Check validity of sign in credentials.
   */
  const formCheck = async (e) => {
    e.preventDefault();

    // form information
    const email = registerForm.current[0].value;
    const password = registerForm.current[1].value;

    const response = await fetch(`http://localhost:8082/organizations/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    let status = "";

    // if org associated with email has successfully been found
    if (json.getCompany) status = json.getCompany[0].Status;

    // org is found and they've been approved
    if (response.ok && status === "accepted") {
      const org = json.getCompany[0];

      signInWithEmailAndPassword(auth, email, password)
        .then(() => window.localStorage.setItem("orgInfo", JSON.stringify({
            name: org.Name,
            email: org.Email,
            organizationId: org.OrganizationID,
            approvedUsers: org.ApprovedUsers,
            id: org._id,
          })), navigate("/dashboard"))
        .catch(() =>
          // org is found but the password is incorrect
          setSnackbar({
            open: true,
            message: "Incorrect password.",
            severity: "error",
          })
        );
    } else {
      let errorMsg = "";

      // still pending
      if (status === "pending")
        errorMsg =
          "The registration status of your account is still pending. Please check back later.";
      // denied
      else if (status === "denied") errorMsg = "Your registration application has been denied.";
      // not registered
      else if (response.status === 400) errorMsg = "This email is not registered with Moneta.";
      // unexpected error
      else errorMsg = "Server error. Try again later";

      setSnackbar({
        open: true,
        message: errorMsg,
        severity: "error",
      });
    }
  };

  return (
    <div className="account-wrapper">
      <div className="background-half" />
      <div className="form-half">
        <div>
          <div className="account-logo">
            <img src={Logo} alt="Moenta logo" />
            <h1>Moneta</h1>
          </div>
          <div className="account-form">
            <h2>Log Into Your Account</h2>
            <p>
              Don&apost have an account? <a href="/register">Sign Up</a>
            </p>
            <form ref={registerForm} onSubmit={formCheck}>
              <label htmlFor="nonprofit-email">
                Email address <br />
                <input
                  required
                  name="nonprofit-email"
                  id="nonprofit-email"
                  type="email"
                  placeholder="Enter Email"
                />{" "}
                <br />
              </label>
              <label htmlFor="nonprofit-password">
                Password <br />
                <input
                  required
                  name="nonprofit-password"
                  id="nonprofit-password"
                  type="password"
                  placeholder="Enter Password"
                />
                <br />
              </label>
              <input type="submit" id="account-submit" value="Continue" />
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
