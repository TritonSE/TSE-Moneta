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
function Admin() {
  return (
    <div className="header">
      <h1>Employees with Access</h1>
      <table>
        {entries.map((entry) => (
          <tr key={entry.email}>
            <td className="name">
              {entry.lastName}, {entry.firstName}
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
