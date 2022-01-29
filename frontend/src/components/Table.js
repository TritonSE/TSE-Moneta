/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

import React from "react";
import "../css/Table.css";

/** Dummy data used to display the table. */
/** Only the fields specified in the schema will be columns in the table */
const _schema = ["name", "age", "gender", "email", "alternateEmail"];
const _table = [
  {
    id: 1,
    name: "First Last",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
  },
  {
    id: 2,
    name: "John Doe",
    age: 25,
    gender: "Male",
    email: "johndoe@gmail.com",
    alternateEmail: "john@email.com",
  },
];

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table() {
  return (
    <div className="table">
      <table>
        <tr>
          {_schema.map((field) => (
            <th>{field}</th>
          ))}
        </tr>
        {_table.map((entry) => (
          <tr key={entry.email}>
            {_schema.map((field) => (
              <td>{entry[field]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
