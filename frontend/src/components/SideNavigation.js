/**
 * Displays the side navigation bar containing buttons for navigating to the
 * home, database, admin, and settings pages.
 *
 * @summary Side navigation bar
 * @author Kevin Fu
 */
import React from "react";

/**
 * Renders the side navigation bar
 * @returns side navigation content
 */
function SideNavigation() {
  return (
    <div className="SideNavigation">
      <button type="button" style={{ top: "6vh" }}>
        Moneta
      </button>
      <button type="button" style={{ top: "25vh" }}>
        Database
      </button>
      <button type="button" style={{ top: "40vh" }}>
        Admin
      </button>
      <button type="button" style={{ top: "55vh" }}>
        Settings
      </button>
      <button type="button" style={{ top: "93vh" }}>
        Log Out
      </button>
    </div>
  );
}
export default SideNavigation;
