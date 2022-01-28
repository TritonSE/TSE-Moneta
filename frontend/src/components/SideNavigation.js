/**
 * Displays the side navigation bar containing buttons for navigating to the
 * home, database, admin, and settings pages.
 *
 * @summary Side navigation bar
 * @author Kevin Fu
 */
import React from "react";
import { Link } from "react-router-dom";
import "../css/SideNavigation.css";
/**
 * Renders the side navigation bar
 * @returns side navigation content
 */
function SideNavigation() {
  return (
    <div className="side-navigation">
      <Link to="/">
        <button type="button" className="home">
          Moneta
        </button>
      </Link>
      <button type="button" className="database">
        Database
      </button>
      <Link to="/admin">
        <button type="button" className="admin">
          Admin
        </button>
      </Link>
      <Link to="/settings">
        <button type="button" className="settings">
          Settings
        </button>
      </Link>
      <button type="button" className="log-out">
        Log Out
      </button>
    </div>
  );
}
export default SideNavigation;
