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

    const orgResponse = await fetch(`http://localhost:8082/organizations?Email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const userResponse = await fetch(`http://localhost:8082/users?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });


    if(orgResponse.status === 200) {
      const orgJson = await orgResponse.json();
      let status = "";

      // if org associated with email has successfully been found
      if (orgJson.getCompany) status = orgJson.getCompany[0].Status;

      // org is found and they've been approved
      if (status === "accepted") {
        const org = orgJson.getCompany[0];

        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
              window.localStorage.setItem("orgInfo", JSON.stringify({
                  name: org.Name,
                  email: org.Email,
                  approvedUsers: org.ApprovedUsers,
                  id: org._id,
              }));
  
              navigate("/dashboard");
          })
          .catch(() =>
            // org is found but the password is incorrect
            setSnackbar({
              open: true,
              message: "Incorrect password.",
              severity: "error",
            })
          );
      }
      else {
      let errorMsg = "";

      // still pending
      if (status === "pending")
        errorMsg =
          "The registration status of your account is still pending. Please check back later.";
      // denied
      else if (status === "denied") errorMsg = "Your registration application has been denied.";
      // unexpected error
      else errorMsg = "Server error. Try again later";

      setSnackbar({
        open: true,
        message: errorMsg,
        severity: "error",
      });
    }
    }
    else if(userResponse.status !== 200) {
      let errorMsg = "";

      // not registered
      if (orgResponse.status === 204) errorMsg = "This email is not registered with Moneta.";
      else errorMsg = "Server error. Try again later";

      setSnackbar({
        open: true,
        message: errorMsg,
        severity: "error",
      });

      return false;
    }

    if(userResponse.status === 200) {
      const userJson = await userResponse.json();
        const user = userJson.getUser[0];
        const orgCheckResponse = await fetch(`http://localhost:8082/organizations?_id=${user.organizationId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const orgCheckJson = await orgCheckResponse.json();
        const org = orgCheckJson.getCompany[0];

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.localStorage.setItem("userInfo", JSON.stringify({
                orgName: org.Name,
                email: user.email,
                name: user.fullName,
                id: user._id
            }));

            navigate("/");
        })
        .catch(() =>
          // org is found but the password is incorrect
          setSnackbar({
            open: true,
            message: "Incorrect password.",
            severity: "error",
          })
        );
    }
    else {
      let errorMsg = "Email or password is incorrect";

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
              Don&apos;t have an account? <a href="/register">Sign Up</a>
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
