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
import Trashcan from "../images/TrashCan.svg";

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function Table({ setTableChanged, setSnackbar, addingRow, data, group, elementsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const maxPage = Math.ceil(data.length / elementsPerPage);

  const rowTemplate = {};

  useEffect(() => {
    if (group && group.values) {
      for (const value of group.values) {
        rowTemplate[value] = "";
      }
    }
    setSelected(new Set());
    setCurrentPage(1);
  }, [group, data]);

  const createTableData = async (dataArg) => {
    setTableChanged(true);

    const tempData = {
      group: group.id,
      data: dataArg,
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempData),
    });

    if (response.ok) {
      setSnackbar({
        open: true,
        message: "Row added!",
        severity: "success",
      });
    } else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }

    setTableChanged(false);
  };

  const updateTableData = async (id, dataArg) => {
    setTableChanged(true);

    const tempData = {
      group: group.id,
      data: dataArg,
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempData),
    });

    if (response.ok) {
      setSnackbar({
        open: true,
        message: "Row updated!",
        severity: "success",
      });
    } else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }

    setTableChanged(false);
  };

  const deleteTableData = async (id) => {
    setTableChanged(true);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows?_id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setSnackbar({
        open: true,
        message: "Row deleted!",
        severity: "success",
      });
    } else {
      const json = await response.json();
      const error = json.error;

      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }

    setTableChanged(false);
  };

  if (!group || Object.keys(group).length === 0) {
    /** Handle no groups selected table here */
    return <></>;
  }

  return (
    <div className="table-div">
      <table className="table">
        <tbody>
          <tr className="table-header-row">
            <th className="checkbox-header-cell"></th>
            {group.values.map((field) => (
              <th className="table-header-cell" key={field._id}>
                {field.name}
              </th>
            ))}
            <th className="table-header-cell">
              <img
                src={Trashcan}
                onClick={() => {
                  selected.forEach((id) => {
                    deleteTableData(id);
                  });
                  selected.clear();
                  setSelected(selected);
                }}
                className="table-delete-selected-svg clickable"
                alt=""
              />
            </th>
          </tr>
          {addingRow ? (
            <TableRow
              newRow
              createTableData={createTableData}
              cellData={rowTemplate}
              groupFields={group.values}
            />
          ) : (
            ""
          )}
          {data
            .slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
            .map((entry) => (
              <TableRow
                id={entry._id}
                newRow={false}
                updateTableData={updateTableData}
                deleteTableData={deleteTableData}
                selected={selected}
                setSelected={setSelected}
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
            onClick={() => {
              setCurrentPage(Math.max(1, currentPage - 1));
              setSelected(new Set());
            }}
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
            onClick={() => {
              setCurrentPage(Math.min(maxPage, currentPage + 1));
              setSelected(new Set());
            }}
          >
            <img src={NextPage} className="table-next-page-icon" alt="Next Page" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
