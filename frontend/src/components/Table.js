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
let _table = [];

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table() {
  // call db data
  // put data into table var
  fetch("http://localhost:8082/getAllRows/62043b1f1f82fc5e39c113f0")
    .then(async (response) => {
      _table = (await response.json())[0].data;
      console.log(_table);
    });

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
