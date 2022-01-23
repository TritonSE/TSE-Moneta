/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

import React from "react";
import "./table.css";

const _schema = ["name", "age", "gender", "email", "alternateEmail"];
const _table = [
  {
    name: "First",
    age: 20,
    gender: "Female",
    email: "firstlast@email.com",
    alternateEmail: "firstlast@hotmail.com",
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
