/**
 * The admin page displays a list of employees with access to the database.
 * Buttons are included to remove and add employees with access.
 *
 * @summary Admin page that allows users to view and edit employees with access.
 * @author Alex Zhang
 */

import React from "react";
import AddIcon from "../images/AddIcon.svg";
import "../css/Admin.css";

const entries = [
  {
    firstName: "First name,",
    lastName: "last name",
    email: "abc@email.com",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@outlook.com",
  },
  {
    firstName: "First",
    lastName: "Last",
    email: "emailaddress@organization.com",
  },
  {
    firstName: "Bartholemew",
    lastName: "Jingleheimer Jameson Jimothy",
    email: "bartholemewjingleheimerjamesonjimothy@gmail.com",
  },
  {
    firstName: "Alex",
    lastName: "Zhang",
    email: "alexzhang1618@gmail.com",
  },
];

/**
 * Renders the admin page
 *
 * @returns Contents of the admin page
 */
function Admin() {
  return (
    <div>
      <div className="admin-div">
        <h1 className="admin-header">Employees with Access</h1>
        <table className="admin-table">
          {entries.map((entry) => (
            <tr className="admin-row" key={entry.email}>
              <td className="name">
                {entry.firstName} {entry.lastName}
              </td>
              <td className="email">{entry.email}</td>
              <td className="remove">
                <button className="remove-button" type="button">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="add-div">
          <button className="add" type="button">
            <img src={AddIcon} className="add-icon-svg" alt="plus icon on add button" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
