/**
 * The Settings page allows users to change their password and includes three text input boxes: current password,
 * new password, and confirm new password. A save button is also included to save the user's changes.
 *
 * @summary Settings page that allows users to change their password.
 * @author Elias Fang
 * @author Navid Boloorian
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import ReactLoading from "react-loading";
import { auth } from "../firebaseConfig";
import SideNavigation from "../components/SideNavigation";
import "../css/Settings.css";

/**
 * renders the settings page
 *
 * @returns page contents
 */
function Settings() {
  const passwordForm = React.useRef();
  const [orgInfo, setOrgInfo] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const newOrgInfo = window.localStorage.getItem("orgInfo");
  const newUserInfo = window.localStorage.getItem("userInfo");

  React.useEffect(() => {
    setOrgInfo(JSON.parse(window.localStorage.getItem("orgInfo")));
    setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
  }, [newOrgInfo, newUserInfo]);

  const handleSnackClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  const formCheck = async (e) => {
    e.preventDefault();

    const oldPass = passwordForm.current[0].value;
    const newPass = passwordForm.current[1].value;
    const confPass = passwordForm.current[2].value;

    const email = orgInfo ? orgInfo.email : userInfo.email;

    if (newPass !== confPass) {
      setSnackbar({
        open: true,
        message: "New password and confirmation do not match.",
        severity: "error",
      });

      return;
    }

    if (newPass.length < 8) {
      setSnackbar({
        open: true,
        message: "Password must be at least 8 characters long.",
        severity: "error",
      });

      return;
    }

    signInWithEmailAndPassword(auth, email, oldPass)
      .then(() => {
        const currUser = auth.currentUser;

        updatePassword(currUser, newPass)
          .then(() => {
            setSnackbar({
              open: true,
              message: "Password changed!",
              severity: "success",
            });

            passwordForm.current.reset();
          })
          .catch(() => {
            setSnackbar({
              open: true,
              message: "Something went wrong, try again later.",
              severity: "error",
            });
          });
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests")
          setSnackbar({
            open: true,
            message:
              "Password change is temporarily disabled due to too many incorrect password entries. Try again later.",
            severity: "error",
          });
        else if (error.code === "auth/wrong-password")
          setSnackbar({
            open: true,
            message: "Current password is incorrect",
            severity: "error",
          });
        else
          setSnackbar({
            open: true,
            message: "Something went wrong, try again later.",
            severity: "error",
          });
      });
  };

  if (!orgInfo && !userInfo)
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#05204a" height={100} width={100} />
      </div>
    );

  return (
    <>
      <SideNavigation userInfo={userInfo} currentPage="/settings" />
      <div className="settings-div">
        <h1 className="settings-header">Change Password</h1>
        <form onSubmit={formCheck} ref={passwordForm} className="settings-form">
          <label htmlFor="current-password" className="settings-form-label current">
            Current Password
            <br />
            <input
              autoFocus
              type="password"
              id="current-password"
              name="current-password"
              className="settings-form-field current"
              required
            />
            <br />
          </label>
          <label htmlFor="new-password" className="settings-form-label new">
            New Password
            <br />
            <input
              type="password"
              id="new-password"
              name="new-password"
              className="settings-form-field new"
              required
            />
            <br />
          </label>
          <label htmlFor="confirm-password" className="settings-form-label confirm">
            Confirm New Password
            <br />
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="settings-form-field confirm"
              required
            />
            <br />
          </label>
          <input type="submit" value="Save" className="settings-save-button" />
        </form>
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
    </>
  );
}

export default Settings;
