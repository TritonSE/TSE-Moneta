/**
 * Create group module that appears when the user wants to add a new group type.
 * Prompts user for name of group and its fields. Allows user to add more fields
 * if needed.
 *
 * @summary Module that displays form for adding group
 * @author Kevin Fu
 * @author William Wu
 */

import React from "react";
import emailjs from "emailjs-com";
import "../css/AddUser.css";

/**
 * Renders create group module
 *
 * @return jsx for create group module
 */
export default function AddUser({ orgId, setAddUserVisible, setSnackbar }) {
  const addUserForm = React.useRef();

  /**
   * Sends email with to user
   */
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_2qqpih5",
      "template_a354xvs",
      addUserForm.current,
      "Gi5qKcyxH5m4iCECW"
    );
  };

  const formCheck = async (e) => {
    e.preventDefault();

    // form information
    const fullName = addUserForm.current[0].value;
    const email = addUserForm.current[1].value;

    const userExists = await fetch(`http://localhost:8082/users?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const orgExists = await fetch(`http://localhost:8082/organizations?Email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (userExists.status === 200) {
      setSnackbar({
        open: true,
        message: "A user with the provided email already exists.",
        severity: "error",
      });
      return;
    }

    if (orgExists.status === 200) {
      setSnackbar({
        open: true,
        message: "An organization with the provided email already exists",
        severity: "error",
      });
      return;
    }

    const data = {
      fullName,
      email,
      organizationId: orgId,
    };

    const response = await fetch(`http://localhost:8082/users`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    const userId = json.addUser._id;

    addUserForm.current[2].value = userId;

    if (response.ok)
      setSnackbar({
        open: true,
        message: "User added!",
        severity: "success",
      });
    else
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });

    sendEmail(e);
    setAddUserVisible(false);
  };

  return (
    <>
      <div onClick={() => setAddUserVisible(false)} className="user-modal-background" />
      <div className="user-modal-view">
        <div className="user-header">
          <h2>Add Employee</h2>
          <p>Added employees will receive an email notification about their new access.</p>
        </div>
        <div className="user-form-wrapper">
          <form ref={addUserForm} onSubmit={formCheck}>
            <label htmlFor="form-full-name">
              Employee Name
              <br />
              <input type="text" placeholder="Full name" name="user-full-name" required />
              <br />
            </label>
            <label htmlFor="form-email">
              Employee Email
              <br />
              <input type="email" placeholder="abc@email.com" name="user-email" required />
              <br />
            </label>
            <input type="hidden" name="user-id" />
            <input type="submit" value="Add" />
          </form>
        </div>
      </div>
    </>
  );
}
