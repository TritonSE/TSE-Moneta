/**
 * Allows users to upload CSV files that get parsed into JSON objects
 * to populate the dashboard table.
 *
 * @summary CSV parser for dashboard table
 * @author Kevin Fu
 * @author Elias Fang
 */

import React, { useState } from "react";
import { useCSVReader, useCSVDownloader } from "react-papaparse";
import { AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";
import CloudUpload from "../images/CloudUpload.svg";

import "../css/CSVParser.css";

/**
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser({
  CSVUploaded,
  setCSVUploaded,
  setSnackbar,
  selectedGroup,
  orgId,
  setDataLoading,
}) {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [tableData, setTableData] = React.useState([]);
  const group = selectedGroup;

  React.useEffect(async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows?group=` + group.id).then(
      async (response) => {
        if (response.ok) {
          let json = await response.json();
          json = json.map((row) => row.data);
          setTableData(json);
        }
      }
    );
  }, [CSVUploaded]);

  /**
   *  Returns true if CSV values are valid, otherwise false.
   *  Checks if the right number of columns are present in each row and whether
   *  each value has the correct type (possible types are number, text, and email).
   * @param values - Array of objects representing a row in the CSV
   */
  function validateCSV(values) {
    const schemaColumns = group.values;

    for (const row of values) {
      if (Object.keys(row).length < schemaColumns.length - 1) return 1; // check if sufficient columns are present
      for (const key of Object.keys(row)) {
        const field = schemaColumns.find((obj) => obj.name === key);
        if (field == null) continue; // skip if col is not present in schema
        if (field.type.toLowerCase() === "number" && !/^\d+$/.test(row[key])) return 2; // if invalid number
        if (field.type.toLowerCase() === "email" && !/^\S+@\S+\.\S+$/.test(row[key])) return 2; // if invalid email
      }
    }
    return 0;
  }

  /**
   * Calls POST /row on CSV data to upload to db.
   *
   * @author Kevin Fu
   */
  async function importToDB(values, CSVUploadedArg, setUploadedCSV) {
    switch (validateCSV(values)) {
      case 1:
        setSnackbar({
          open: true,
          message: "Invalid CSV! Missing Columns!",
          severity: "error",
        });
        return;
      case 2:
        setSnackbar({
          open: true,
          message: "Invalid CSV! Field types do not match!",
          severity: "error",
        });
        return;
    }

    // should ask user to confirm before clearing
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows?group=` + group.id, {
      method: "DELETE",
      mode: "cors",
    });

    setDataLoading(true);
    for (const row of values) {
      const data = {
        group: group.id,
        data: row,
        organizationId: orgId,
      };

      await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
    }
    setDataLoading(false);

    setUploadedCSV(!CSVUploadedArg); // tell table to reload
    setSnackbar({
      open: true,
      message: "CSV uploaded!",
      severity: "success",
    });
  }

  const [CSVFlowVisible, setCSVFlowVisible] = useState(false);
  return (
    <div>
      {CSVFlowVisible ? (
        <div className="modal-background">
          <div className="modal-view csv">
            <h1 className="upload-csv-header">Upload CSV File</h1>
            <div className="upload-csv-area">
              <img src={CloudUpload} className="upload-csv-cloud" alt="Upload" />
              <p className="upload-csv-area-text">Drag and drop files here to upload</p>
              <p className="upload-csv-area-text">or</p>
              <CSVReader
                // assumes csv comes with header row
                config={{
                  header: true,
                }}
                onUploadAccepted={(results) => {
                  importToDB(results.data, CSVUploaded, setCSVUploaded).then();
                  // console.log(results);
                }}
              >
                {({ getRootProps }) => (
                  <div>
                    <button
                      type="submit"
                      {...getRootProps()}
                      className="modal-blue csv-browse-files"
                    >
                      Browse Files
                    </button>
                  </div>
                )}
              </CSVReader>
            </div>
            <div className="csv-submit-div">
              <button
                className="modal-white csv-cancel"
                type="button"
                onClick={() => setCSVFlowVisible(false)}
              >
                Cancel
              </button>
              <button className="modal-blue csv-next" type="submit">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="csv-parser">
        <button type="button" onClick={() => setCSVFlowVisible(true)} className="csv-button">
          <AiOutlineCloudUpload className="csv-icon cloud" /> Upload CSV
        </button>
        <CSVDownloader
          type={Type.Button}
          className="csv-button download"
          filename="data"
          bom
          config={{
            delimiter: ";",
          }}
          data={tableData}
        >
          <AiOutlineDownload className="csv-icon download" /> Download
        </CSVDownloader>
      </div>
    </div>
  );
}

export default CSVParser;
