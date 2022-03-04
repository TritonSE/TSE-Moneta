/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

import React from "react";
import TableRow from "./TableRow";

import "../css/Table.css";

/** Dummy data used to display the table. */
/** Only the fields specified in the schema will be columns in the table */
const _schema = ["name", "age", "gender", "email", "alternateEmail"];

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table({ CSVUploaded }) {
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

  return (
    <div className="table-div">
      <table className="table">
        <tr className="table-header-row">
          {_schema.map((field) => (
            <th className="table-header-cell">{field}</th>
          ))}
        </tr>
        {tableData.map((entry) => (
          <TableRow columnData={entry} groupFields={_schema} />
        ))}
      </table>
    </div>
  );
}

export default Table;
