/**
 * The Settings page allows users to change their password and includes three text input boxes: current password,
 * new password, and confirm new password. A save button is also included to save the user's changes.
 *
 * @summary Settings page that allows users to change their password.
 * @author Elias Fang
 */

import React from "react";
import SideNavigation from "../components/SideNavigation";
import "../css/Settings.css";

/**
 * renders the settings page
 *
 * @returns page contents
 */
function Settings() {
  return (
    <>
      <SideNavigation currentPage="/settings" />
      <div className="settings-div">
        <h1 className="settings-header">Change Password</h1>
        <form className="settings-form">
          <label htmlFor="current-password" className="settings-form-label current">
            Current Password
            <input
              type="password"
              id="current-password"
              name="current-password"
              className="settings-form-field current"
            />
          </label>
          <label htmlFor="new-password" className="settings-form-label new">
            New Password
            <input
              type="password"
              id="new-password"
              name="new-password"
              className="settings-form-field new"
            />
          </label>
          <label htmlFor="confirm-password" className="settings-form-label confirm">
            Confirm New Password
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="settings-form-field confirm"
            />
          </label>
          <input type="submit" value="Save" className="settings-save-button" />
        </form>
      </div>
    </>
  );
}

export default Settings;
