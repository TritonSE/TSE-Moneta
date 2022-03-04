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
function Table({ CSVUploaded, setSnackbar, addingRow }) {
  const [tableGroup, setTableGroup] = React.useState(1);
  const [tableData, setTableData] = React.useState([]);
  const group = "1"; // temporary dummy data, should be determined by drop-down menu

  React.useEffect(async () => {
    await fetch("http://localhost:8082/rows?group=" + group).then(async (response) => {
      let json = await response.json();

      console.log(json);

      let dataArray = json.map((row) => {
        row.data._id = row._id;
        return row.data;
      });

      setTableData(dataArray);
    });
  }, [CSVUploaded]);

  const updateTableData = async (uploadObj) => {
    const { _id } = uploadObj;
    let tempData = {};

    for(let key in uploadObj) {
      if(key != "_id") {
        tempData[key] = uploadObj[key];
      }
    }

    const data = {
      id: _id,
      data: tempData
    }

    const res = await fetch(`http://localhost:8082/rows/${_id}`, {
      method: "put",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if(res.ok) {
      setSnackbar({
        open: true,
        message: "Successfully updated table!",
        severity: "success",
      })
    }
    else {
      setSnackbar({
        open: true,
        message: "Error: Table update unsuccessful!",
        severity: "error",
      })
    }

    return res.ok;
  }

  const createTableData = async (uploadObj) => {
    let tempData = {};

    console.log(uploadObj);

    for(let key in uploadObj) {
      if(key != "_id") {
        tempData[key] = uploadObj[key];
      }
    }

    const data = {
      group: tableGroup,
      data: tempData
    }

    const res = await fetch(`http://localhost:8082/rows`, {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if(res.ok) {
      setSnackbar({
        open: true,
        message: "Successfully added row to table!",
        severity: "success",
      })

      location.reload();
    }
    else {
      setSnackbar({
        open: true,
        message: "Error: table add unsuccessful!",
        severity: "error",
      })
    }

    return res.ok;
  }

  const deleteTableData = async (id) => {

    const res = await fetch(`http://localhost:8082/rows?_id=${id}`, {
      method: "delete",
      headers: {
        'content-type': 'application/json'
      },
    })

    console.log(res);

    if(res.ok) {
      setSnackbar({
        open: true,
        message: "Successfully deleted row from table!",
        severity: "success",
      })

      location.reload();
    }
    else {
      setSnackbar({
        open: true,
        message: "Error: Table row deletion unsuccessful!",
        severity: "error",
      })
    }

    return res.ok;
  }

  return (
    <div className="table-div">
      <table className="table">
        <tr className="table-header-row">
          {_schema.map((field) => (
            <th className="table-header-cell">{field}</th>
          ))}
        </tr>
        {addingRow ? <TableRow newRow={true} createTableData={createTableData} cellData={_schema} groupFields={_schema} /> : ""}
        {tableData.map((entry) => (
          <TableRow newRow={false} deleteTableData={deleteTableData} updateTableData={updateTableData} cellData={entry} groupFields={_schema} />
        ))}
      </table>
    </div>
  );
}

export default Table;
