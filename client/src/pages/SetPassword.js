/**
 * Set password page for approved users. Users are sent links to this page in their emails once signed up.
 *
 * @summary Set password page.
 * @author Navid Boloorian
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useParams } from "react-router";
import { auth } from "../firebaseConfig";
import Logo from "../images/Logo.svg";

import "../css/Account.css";

export default function SetPassword() {
  const registerForm = React.useRef();
  const [user, setUser] = React.useState({});
  const [disabled, setDisabled] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const { userId } = useParams();

  React.useEffect(() => {
    // get selected user's information from the id
    async function fetchUserData() {
      const selectedUser = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users?_id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("checking");
      const json = await selectedUser.json();

      // attempt a sign in through firebase
      const signInMethods = await fetchSignInMethodsForEmail(auth, json.getUser[0].email);
      const registered = signInMethods.length !== 0;

      // if sign in is successful (user's password is already set) or the user is not found in our db then redirect to login
      if (selectedUser.status === 400 || registered) window.location.href = "/login";

      setUser(json.getUser[0]);
    }

    fetchUserData();
  }, [userId]);

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
    setDisabled(true);

    // form information
    const password = registerForm.current[0].value;
    const confPassword = registerForm.current[1].value;

    if (password !== confPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });

      setDisabled(false);
      return;
    }

    if (password.length < 8) {
      setSnackbar({
        open: true,
        message: "Password must be at least 8 characters long.",
        severity: "error",
      });

      setDisabled(false);
      return;
    }

    await fetch(`${process.env.REACT_APP_BACKEND_URI}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      mode: "cors",
    });

    createUserWithEmailAndPassword(auth, user.email, password);
    setSnackbar({
      open: true,
      message: "Password set! Redirecting to login...",
      severity: "success",
    });

    // give enough time ot read the snackbar
    setTimeout(() => {
      setDisabled(false);
      window.location.href = "/login";
    }, 1000);
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
            <h2>
              Hi {user.fullName}, <br /> Create Your Password
            </h2>
            <form disabled={disabled} ref={registerForm} onSubmit={formCheck}>
              <label htmlFor="user-password">
                Password <br />
                <input
                  autoFocus
                  required
                  name="user-password"
                  id="user-password"
                  type="password"
                  placeholder="Enter Password"
                />
                <br />
              </label>
              <label htmlFor="conf-user-password">
                Confirm Password <br />
                <input
                  required
                  name="conf-user-password"
                  id="conf-user-password"
                  type="password"
                  placeholder="Confirm Password"
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
