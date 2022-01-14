/**
 * The Settings page allows users to change their password and includes three text input boxes: current password,
 * new password, and confirm new password. A save button is also included to save the user's changes.
 *
 * @summary Settings page that allows users to change their password.
 * @author Elias Fang
 */

import React from "react";

/**
 * renders the settings page
 *
 * @returns page contents
 */
function Settings() {
  return (
    <div className="Settings">
      <header className="Settings-header">
        <h1>Change Password</h1>
      </header>
      <form className="Settings-form">
        <label for="current-password">Current Password</label>
        <br />
        <input type="text" id="current-password" name="current-password" />
        <br />
        <label for="new-password1">New Password</label>
        <br />
        <input type="text" id="new-password1" name="new-password1" />
        <br />
        <label for="new-password2">New Password</label>
        <br />
        <input type="text" id="new-password2" name="new-password2" />
        <br />
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
}

export default Settings;
