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
import Select from "react-select";
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
  setSelectedGroup,
  groupOptions,
  orgId,
  setDataLoading,
  groupCreationVisible,
  setGroupCreationVisible,
  setCSVFields,
  setCSVData,
  setVisiblity,
  CSVFlowVisible,
  setCSVFlowVisible,
  forceNewGroup,
}) {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [tableData, setTableData] = React.useState([]);
  const [group, setGroup] = useState(selectedGroup);
  const [noGroupCSVData, setNoGroupCSVData] = useState(null);
  const [formSubmittable, setFormSubmittable] = useState(false);
  // Tracks if group creation from CSV is toggled
  const [useExistingCSVGroup, setUseExistingCSVGroup] = useState(false);
  // Tracks if group select page (flow from uploading to existing group) is selected
  const [groupSelectionVisible, setGroupSelectionVisible] = useState(false);

  React.useEffect(async () => {
    if (group) {
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
      let colsSatisfied = 0;
      for (const key of Object.keys(row)) {
        const field = schemaColumns.find((obj) => obj.name === key);
        if (field == null) continue; // skip if col is not present in schema
        if (field.type.toLowerCase() === "number" && !/^\d+$/.test(row[key])) return 2; // if invalid number
        if (field.type.toLowerCase() === "email" && !/^\S+@\S+\.\S+$/.test(row[key])) return 2; // if invalid email
        // No issues, so we mark this schema column as complete
        colsSatisfied += 1;
      }
      // Make sure all schema columns are represented in the row before continuing...
      if (colsSatisfied !== schemaColumns.length) {
        return 1;
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
      default:
        break;
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
            // if we create group from CSV
            setCSVData(results.data);

            let headers = Object.keys(results.data[0]);
            headers = headers.map((value) => {
              return { name: value, type: "Text" };
            });
            setCSVFields(headers);

            // add to current group
            setNoGroupCSVData(results.data);
            setFormSubmittable(true);
          }}
        >
          {({ getRootProps, acceptedFile, ProgressBar }) => (
            <div className="modal-background">
              <div className="modal-view csv">
                <h1 className="upload-csv-header">Upload CSV File</h1>
                {groupSelectionVisible ? (
                  <h3 className="upload-csv-subheader">Add CSV Upload to Group</h3>
                ) : (
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
                )}
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
                {forceNewGroup || groupSelectionVisible ? null : ( // We don't provide this dropdown option if we forceNewGroup
                  <div className="radio-div">
                    <label htmlFor="create-group-csv" className="create-group-csv-label">
                      Add uploaded CSV to an existing group?
                    </label>
                    <input
                      type="checkbox"
                      className="create-group-csv-button"
                      id="create-group-csv"
                      value="create-group-csv"
                      checked={useExistingCSVGroup}
                      onClick={() => setUseExistingCSVGroup(!useExistingCSVGroup)}
                    />
                  </div>
                )}
                {groupSelectionVisible ? (
                  <div>
                    <p>Select the group you want your CSV upload to go into.</p>
                    <Select
                      className="csv-group-select"
                      classNamePrefix="select"
                      options={groupOptions}
                      placeholder="Select existing group..."
                      value={group}
                      onChange={(option) => setGroup(option)}
                    />
                  </div>
                ) : null}
                <div className="csv-submit-div">
                  <button
                    className="modal-white csv-cancel"
                    type="button"
                    onClick={() => {
                      if (groupSelectionVisible) {
                        setGroupSelectionVisible(false);
                      } else {
                        setFormSubmittable(false);
                        setCSVFlowVisible(false);
                        setNoGroupCSVData(null);
                      }
                    }}
                  >
                    {groupSelectionVisible ? "Back" : "Cancel"}
                  </button>
                  <button
                    className={
                      formSubmittable ? "modal-blue csv-next" : "modal-blue csv-next disabled"
                    }
                    type="submit"
                    onClick={() => {
                      if (formSubmittable) {
                        if (forceNewGroup || !useExistingCSVGroup) {
                          setCSVFlowVisible(false);
                          setGroupCreationVisible(!groupCreationVisible);
                        } else if (groupSelectionVisible) {
                          setCSVFlowVisible(false);
                          setGroupSelectionVisible(false);
                          importToDB(noGroupCSVData, CSVUploaded, setCSVUploaded).then();
                          // Update dashboard to display newly uploaded group
                          setSelectedGroup(group);
                          setNoGroupCSVData(null);
                          setFormSubmittable(false);
                          setVisiblity(false);
                        } else {
                          setGroupSelectionVisible(true);
                        }
                      }
                    }}
                  >
                    {groupSelectionVisible ? "Finish" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </CSVReader>
      ) : null}

      {!forceNewGroup && (
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
      )}
    </div>
  );
}

export default CSVParser;
