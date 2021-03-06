/**
 * Displays the side navigation bar containing buttons for navigating to the
 * home, database, admin, and settings pages.
 *
 * @summary Side navigation bar
 * @author Kevin Fu
 */
import React from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Logo from "../images/Logo.svg";
import DatabaseIcon from "../images/DatabaseIcon";
import AdminIcon from "../images/AdminIcon";
import SettingsIcon from "../images/SettingsIcon";
import LogOut from "../images/LogOut.svg";
import "../css/SideNavigation.css";

/**
 * Renders the side navigation bar
 * @returns side navigation content
 */
function SideNavigation(props) {
  let databaseClassName = "sidenav-button database";
  let adminClassName = "sidenav-button admin";
  let settingsClassName = "sidenav-button settings";

  if (props.currentPage === "/admin") {
    adminClassName = "sidenav-button admin active";
  } else if (props.currentPage === "/settings") {
    settingsClassName = "sidenav-button settings active";
  } else {
    databaseClassName = "sidenav-button database active";
  }

  const signOutUser = () => {
    signOut(auth);
    window.localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="side-navigation">
      <Link to="/">
        <button type="button" className="sidenav-home">
          <img src={Logo} className="sidenav-logo" alt="Moneta" />
          Moneta
        </button>
      </Link>

      <div className="side-navigation-tabs" style={props.userInfo && { height: "40vh" }}>
        <Link to="/">
          <button type="button" className={databaseClassName}>
            <DatabaseIcon className="sidenav-icon" />
          </button>
          <p className="sidenav-description database">Database</p>
        </Link>

        {!props.userInfo ? (
          <Link to="/admin">
            <button type="button" className={adminClassName}>
              <AdminIcon className="sidenav-icon" />
            </button>
            <p className="sidenav-description admin">Admin</p>
          </Link>
        ) : (
          ""
        )}

        <Link to="/settings">
          <button type="button" className={settingsClassName}>
            <SettingsIcon className="sidenav-icon" />
          </button>
          <p className="sidenav-description settings">Settings</p>
        </Link>
      </div>

      <button type="button" onClick={signOutUser} className="sidenav-logout">
        <img src={LogOut} className="sidenav-icon-logout" alt="Log Out" />
        Log Out
      </button>
    </div>
  );
}
export default SideNavigation;
