/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

import React from "react";
import Pencil from "../images/Pencil.svg";
import "../css/Table.css";

/**
 * Dummy data used to display the table.
 * Only the fields specified in the schema will be columns in the table
 */
const _schema = ["name", "age", "gender", "email", "alternateEmail", "role"];
const _table = [
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
    role: "Employee",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
    role: "Employee",
  },
];

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table() {
  return (
    <div className="table-div">
      <table className="table">
        <tr className="table-header-row">
          {_schema.map((field) => (
            <th className="table-header-cell">{field}</th>
          ))}
        </tr>
        {_table.map((entry) => (
          <tr className="table-body-row" key={entry.email}>
            {_schema.map((field) => (
              <td className="table-body-cell">{entry[field]}</td>
            ))}
            <img src={Pencil} className="pencil-svg" alt="edit icon on table row" />
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
