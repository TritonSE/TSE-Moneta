/**
 * Displays the side navigation bar containing buttons for navigating to the
 * home, database, admin, and settings pages.
 *
 * @summary Side navigation bar
 * @author Kevin Fu
 */
import React from "react";
import { Link } from "react-router-dom";
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
function SideNavigation() {
  return (
    <div className="side-navigation">
      <Link to="/">
        <button type="button" className="sidenav-home">
          <img src={Logo} className="sidenav-logo" alt="Moneta" />
          Moneta
        </button>
      </Link>

      <Link to="/">
        <button type="button" className="sidenav-button database">
          <DatabaseIcon className="sidenav-icon database" />
        </button>
        <p className="sidenav-description database">Database</p>
      </Link>

      <Link to="/admin">
        <button type="button" className="sidenav-button admin">
          <AdminIcon className="sidenav-icon admin" />
        </button>
        <p className="sidenav-description admin">Admin</p>
      </Link>

      <Link to="/settings">
        <button type="button" className="sidenav-button settings">
          <SettingsIcon className="sidenav-icon settings" />
        </button>
        <p className="sidenav-description settings">Settings</p>
      </Link>

      <button type="button" className="sidenav-logout">
        <img src={LogOut} className="sidenav-icon-logout" alt="Log Out" />
        Log Out
      </button>
    </div>
  );
}
export default SideNavigation;
