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
function Table({ Data }) {
  /**
  const [tableGroup, setTableGroup] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const group = "1"; // temporary dummy data, should be determined by drop-down menu

  React.useEffect(async () => {
    await fetch("http://localhost:8082/rows?group=" + group).then(async (response) => {
      let json = await response.json();
      json = json.map((row) => row.data);
      setTableData(json);
    });
  }, [CSVUploaded]);
  */

  return (
    <div className="table-div">
      <table className="table">
        <tr className="table-header-row">
          {_schema.map((field) => (
            <th className="table-header-cell">{field}</th>
          ))}
        </tr>
        {Data.map((entry) => (
          <tr className="table-body-row" key={entry._id}>
            {_schema.map((field) => (
              <td className="table-body-cell">{entry.data[field]}</td>
            ))}
            <img src={Pencil} className="pencil-svg" alt="edit icon on table row" />
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
