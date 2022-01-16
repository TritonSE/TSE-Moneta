/**
 * The admin page displays a list of employees with access to the database.
 * Buttons are included to remove and add employees with access.
 *
 * @summary Admin page that allows users to view and edit employees with access.
 * @author Alex Zhang
 */

import React from "react";
import "./admin.css";

const entries = [
  {
    firstName: "Alex",
    lastName: "Zhang",
    email: "alexzhang1618@gmail.com",
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
];

/**
 * Renders the admin page
 *
 * @returns Contents of the admin page
 */
function Admin() {
  return (
    <div className="header">
      <h1>Employees with Access</h1>
      <table>
        {entries.map((entry) => (
          <tr key={entry.email}>
            <td className="name">
              {entry.firstName} {entry.lastName}
            </td>
            <td className="email">{entry.email}</td>
            <button type="button">Remove</button>
          </tr>
        ))}
      </table>
      <button type="button">Add</button>
    </div>
  );
}

export default Admin;
