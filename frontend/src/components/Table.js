/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

 import React, { useState } from "react";
 import TableRow from "./TableRow";
 import PrevPage from "../images/PrevPageIcon.svg";
 import NextPage from "../images/NextPageIcon.svg";
 import "../css/Table.css";
 
 /**
  * Renders the table display.
  *
  * @returns Table display for dashboard.
  */
 function Table({ data, group, elementsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / elementsPerPage);

  const createTableData = (data) => {
    console.log(data);
  }

  const updateTableData = async (id, data) => {
    const tempData = {
      group: group.id, 
      data: data
    }

    await fetch(`http://localhost:8082/rows/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempData)
    }) 
  }

  const deleteTableData = async (id) => {
    const response = await fetch(`http://localhost:8082/rows?_id=${id}`, {
      method: "DELETE",
    }) 

    console.log(response)
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
          {data
            .slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
            .map((entry) => (
              <TableRow 
                id={entry._id}
                newRow={false}
                createTableData={createTableData}
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