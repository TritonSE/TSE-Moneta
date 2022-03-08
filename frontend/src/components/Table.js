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

/** Dummy data used to display the table. */
/** Only the fields specified in the schema will be columns in the table */
const _schema = ["name", "age", "gender", "email", "alternateEmail"];

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table({ data, group }) {
  return (
    <div className="table-div">
      <table className="table">
        <tbody>
          <tr className="table-header-row">
            {group.Values.map((field) => (
              <th className="table-header-cell">{field.name}</th>
            ))}
          </tr>
          {data.map((entry) => (
            <tr className="table-body-row" key={entry._id}>
              {group.Values.map((field) => (
                <td className="table-body-cell">{entry.data[field.name]}</td>
              ))}
              <img src={Pencil} className="pencil-svg" alt="edit icon on table row" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
