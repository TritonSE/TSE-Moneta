/**
 * Allows users to upload CSV files that get parsed into JSON objects
 * to populate the dashboard table.
 *
 * @summary CSV parser for dashboard table
 * @author Kevin Fu
 * @author Elias Fang
 * @author Alex Zhang
 */

import React, { useState } from "react";
import { useCSVReader, useCSVDownloader, formatFileSize } from "react-papaparse";
import { AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";
import CloudUpload from "../images/CloudUpload.svg";
import FileIcon from "../images/File.svg";

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
<<<<<<< HEAD
  createCSVGroup,
  groupCreationVisible,
  setGroupCreationVisible,
  setCSVFields,
  setCSVData,
=======
  setVisiblity
>>>>>>> 735491ccf6020379cf0d2378c26c7641b3bc3b69
}) {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [tableData, setTableData] = React.useState([]);
  const group = selectedGroup;
  const [CSVFlowVisible, setCSVFlowVisible] = useState(false);
  const [CSVData, setCSVData] = useState(null);
  const [formSubmittable, setFormSubmittable] = useState(false);

  React.useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows?group=` + group.id).then(
        async (response) => {
          if (response.ok) {
            let json = await response.json();
            json = json.map((row) => row.data);
            setTableData(json);
          }
        }
      );
    }
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

  return (
    <div>
      {CSVFlowVisible ? (
        <CSVReader
          // assumes csv comes with header row
          config={{
            header: true,
          }}
          onUploadAccepted={async (results) => {
            if (createCSVGroup) {
              // if we create group from CSV
              let headers = Object.keys(results.data[0]);
              headers = headers.map((value) => {
                return { name: value, type: "Text" };
              });
              setCSVFields(headers);
              setCSVData(results.data);
              setGroupCreationVisible(!groupCreationVisible);
            } else {
              importToDB(results.data, CSVUploaded, setCSVUploaded).then();
            }
            // console.log(results);
          }}
        >
          {({ getRootProps, acceptedFile, ProgressBar }) => (
            <div className="modal-background">
              <div className="modal-view csv">
                <h1 className="upload-csv-header">Upload CSV File</h1>
                <div className="upload-csv-area" {...getRootProps()}>
                  <img src={CloudUpload} className="upload-csv-cloud" alt="Upload" />
                  <p className="upload-csv-area-text">Drag and drop files here to upload</p>
                  <p className="upload-csv-area-text">or</p>
                  <div>
                    <button type="submit" className="modal-blue csv-browse-files">
                      Browse Files
                    </button>
                  </div>
                </div>
                {acceptedFile ? (
                  <div className="csv-progress-div">
                    <div className="csv-progress-file-icon-container">
                      <img src={FileIcon} className="csv-progress-file-icon" alt="File" />
                    </div>
                    <div className="csv-progress-text-div">
                      <p className="csv-progress-file-name">{acceptedFile.name}</p>
                      <div
                        className={
                          formSubmittable ? "csv-progress-bar-div full" : "csv-progress-bar-div"
                        }
                      >
                        <ProgressBar className="csv-progress-bar" />
                      </div>
                      <span className="csv-progress-file-size">
                        {formatFileSize(acceptedFile.size)}
                      </span>
                      <span className="csv-progress-status">
                        {formSubmittable ? "Upload complete!" : "Uploading..."}
                      </span>
                    </div>
                  </div>
                ) : null}
                <div className="csv-submit-div">
                  <button
                    className="modal-white csv-cancel"
                    type="button"
                    onClick={() => {
                      setFormSubmittable(false);
                      setCSVFlowVisible(false);
                      setCSVData(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      formSubmittable ? "modal-blue csv-next" : "modal-blue csv-next disabled"
                    }
                    type="submit"
                    onClick={() => {
                      if (formSubmittable) {
                        importToDB(CSVData, CSVUploaded, setCSVUploaded).then();
                        setCSVData(null);
                        setFormSubmittable(false);
                        setCSVFlowVisible(false);
                        setVisiblity(false);
                      }
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          )}
        </CSVReader>
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
