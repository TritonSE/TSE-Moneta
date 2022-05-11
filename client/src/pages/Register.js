/**
 * Register page for singing up new orgs. When an org signs up, an email is sent to the specified address and a manual review is initiated.
 *
 * @summary Register page.
 * @author Navid Boloorian
 */

import React from "react";
import emailjs from "emailjs-com";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import { auth } from "../firebaseConfig";
import Logo from "../images/Logo.svg";
import Back from "../images/BackButton.svg";

import "../css/Account.css";

export default function Register() {
  const registerForm = React.useRef();
  const [registered, setRegistered] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  /**
   * Make sure a user is not logged in during registration
   */
  React.useEffect(() => {
    window.localStorage.clear();
  }, []);

  const handleSnackClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  /**
   * Sends email with org information to email
   */
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE,
      process.env.REACT_APP_EMAILJS_REGISTER_TEMPLATE,
      registerForm.current,
      process.env.REACT_APP_EMAILJS_UID
    );
  };

  /**
   * Checks if the sign up credentials are correct
   *
   * @returns true if successful, false otherwise
   */
  const formCheck = async (e) => {
    e.preventDefault();

    // form information
    const email = registerForm.current[0].value;
    const name = registerForm.current[1].value;
    const password = registerForm.current[2].value;

    if (password.length < 8)
      return setSnackbar({
        open: true,
        message: "Password must be at least 8 characters long",
        severity: "error",
      });

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/organizations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: name, Email: email, Password: password }),
    });

    const userCheck = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users?email=${email}`, {
      method: "GET",
    });

    if (userCheck.status === 200) {
      setSnackbar({
        open: true,
        message: "Email already in use",
        severity: "error",
      });

      return false;
    }

    const json = await response.json();

    // if email is not already in db
    if (response.ok) {
      sendEmail(e);
      setRegistered(true);

      // use firebase to sign up user
      createUserWithEmailAndPassword(auth, email, password);
    }
    // if email is already in db
    else if (response.status === 409)
      setSnackbar({
        open: true,
        message: json.msg,
        severity: "error",
      });
    // some unexpected error
    else
      setSnackbar({
        open: true,
        message: "Server error. Try again later",
        severity: "error",
      });

    return response.ok;
  };

  return (
    <div className="account-wrapper">
      <div className="background-half" />
      <div className="form-half">
        <div>
          {registered && (
            <div id="button-container" onClick={() => setRegistered(false)}>
              <img src={Back} alt="Back button" />
              <p>Back</p>
            </div>
          )}
          <div className="account-logo">
            <img src={Logo} alt="Moneta logo" />
            <h1>Moneta</h1>
          </div>
          <div className="account-form">
            {!registered ? (
              <>
                <h2>Create An Account</h2>
                <p>
                  Already have an account? <a href="/login">Log In</a>
                </p>
                <form ref={registerForm} onSubmit={formCheck}>
                  <label htmlFor="nonprofit-email">
                    Email address <br />
                    <input
                      autoFocus
                      required
                      name="nonprofit-email"
                      id="nonprofit-email"
                      type="email"
                      placeholder="Enter Email"
                    />
                    <br />
                  </label>
                  <label htmlFor="nonprofit-name">
                    Name of nonprofit <br />
                    <input
                      required
                      name="nonprofit-name"
                      id="nonprofit-name"
                      type="text"
                      placeholder="Enter Nonprofit"
                    />
                    <br />
                  </label>
                  <label htmlFor="nonprofit-password">
                    Create Password <br />
                    <input
                      required
                      name="nonprofit-password"
                      id="nonprofit-password"
                      type="password"
                      placeholder="Enter Password"
                    />{" "}
                    <br />
                  </label>
                  <br />
                  <input type="submit" id="account-submit" value="Continue" />
                </form>
              </>
            ) : (
              <>
                <h2>Your Registration is Under Review.</h2>
                <h3>Please wait up to 24 hours to receive a response.</h3>
                <p>
                  Haven&apos;t received a reponse yet? <a href="/#">Contact us.</a>
                </p>
              </>
            )}
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
