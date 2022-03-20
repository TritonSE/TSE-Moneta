/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

 import React, { useEffect, useState } from "react";
 import TableRow from "./TableRow";
 import PrevPage from "../images/PrevPageIcon.svg";
 import NextPage from "../images/NextPageIcon.svg";
 import "../css/Table.css";
 
 /**
  * Renders the table display.
  *
  * @returns Table display for dashboard.
  */
 function Table({ setSnackbar, addingRow, data, group, elementsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / elementsPerPage);

  let rowTemplate = {};

  useEffect(() => {
    if(group && group.values) {
      for(let value of group.values) {
        rowTemplate[value] = "";
      }
    }
  }, [group])

  const createTableData = async (data) => {
    const tempData = {
      group: group.id, 
      data: data
    }

    const response = await fetch(`http://localhost:8082/rows`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempData)
    }) 

    if(response.ok) {
      setSnackbar({
        open: true,
        message: "Row added!",
        severity: "success"
      })
    }
    else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error"
      })
    }
  }

  const updateTableData = async (id, data) => {
    const tempData = {
      group: group.id, 
      data: data
    }

    const response = await fetch(`http://localhost:8082/rows/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempData)
    }) 

    if(response.ok) {
      setSnackbar({
        open: true,
        message: "Row updated!",
        severity: "success"
      })
    }
    else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error"
      })
    }
  }

  const deleteTableData = async (id) => {
    const response = await fetch(`http://localhost:8082/rows?_id=${id}`, {
      method: "DELETE",
    }) 

    if(response.ok) {
      setSnackbar({
        open: true,
        message: "Row deleted!",
        severity: "success"
      })
    }
    else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error"
      })
    }
  }

  if (!group || Object.keys(group).length === 0) {
    /** Handle no groups selected table here */
    return null;
  }
  return (
    <div className="table-div">
      <table className="table">
        <tbody>
          <tr className="table-header-row">
            {group.values.map((field) => (
              <th className="table-header-cell" key={field._id}>
                {field.name}
              </th>
            ))}
          </tr>
          {addingRow ? 
          <TableRow 
            newRow
            createTableData={createTableData}
            cellData={rowTemplate}
            groupFields={group.values}
          /> : ""}
          {data
            .slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
            .map((entry) => (
              <TableRow 
                id={entry._id}
                newRow={false}
                updateTableData={updateTableData}
                deleteTableData={deleteTableData}
                cellData={entry.data}
                groupFields={group.values}
              />
            ))}
        </tbody>
      </table>
      {maxPage === 0 ? null : (
        <div className="table-page-selector">
          <button
            className="table-button prev-page"
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <img src={PrevPage} className="table-prev-page-icon" alt="Previous Page" />
          </button>
          <p className="table-page-selector-text current">{currentPage}</p>
          <p className="table-page-selector-text of">of</p>
          <p className="table-page-selector-text">{maxPage}</p>
          <p className="table-row-count">{data.length} rows</p>
          <button
            className="table-button next-page"
            type="button"
            onClick={() => setCurrentPage(Math.min(maxPage, currentPage + 1))}
          >
            <img src={NextPage} className="table-next-page-icon" alt="Next Page" />
          </button>
        </div>
      )}
    </div>
  );
 }
 
 export default Table;