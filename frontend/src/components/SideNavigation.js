/**
 * Displays the side navigation bar containing buttons for navigating to the
 * home, database, admin, and settings pages.
 *
 * @summary Side navigation bar
 * @author Kevin Fu
 */
import React from "react";
import "./SideNavigation.css"
/**
 * Renders the side navigation bar
 * @returns side navigation content
 */
function SideNavigation() {
  return (
    <div className="side-navigation">
      <button type="button" className="home">
        Moneta
      </button>
      <button type="button" className="database">
        Database
      </button>
      <button type="button" className="admin">
        Admin
      </button>
      <button type="button" className="settings">
        Settings
      </button>
      <button type="button" className="log-out">
        Log Out
      </button>
    </div>
  );
}
export default SideNavigation;
