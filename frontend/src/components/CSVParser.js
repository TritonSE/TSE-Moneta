/**
 * Allows users to upload CSV files that get parsed into JSON objects
 * to populate the dashboard table.
 *
 * @summary CSV parser for dashboard table
 * @author Kevin Fu
 * @author Elias Fang
 */

/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useCSVReader, useCSVDownloader } from "react-papaparse";
import { AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";

import "../css/CSVParser.css";

/**
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser({ CSVUploaded, setCSVUploaded, setSnackbar }) {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();

  /**
   *  Returns true if CSV values are valid, otherwise false.
   *  Checks if the right number of columns are present in each row and whether
   *  each value has the correct type (possible types are number, text, and email).
   * @param values - Array of objects representing a row in the CSV
   */
  function validateCSV(values) {
    const schemaColumns = [
      { name: "id", type: "Number" },
      { name: "name", type: "Text" },
      { name: "age", type: "Number" },
      { name: "gender", type: "Text" },
      { name: "email", type: "Email" },
      { name: "alternateEmail", type: "Email" },
    ]; // temporary dummy data, should be determined by group selected by drop-down menu

    for (const row of values) {
      if (Object.keys(row).length < schemaColumns.length) return 1; // check if sufficient columns are present
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
  async function importToDB(values, CSVUploaded, setUploadedCSV) {
    const group = "1"; // temporary dummy data, should be determined by drop-down menu

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
    await fetch("http://localhost:8082/rows?group=" + group, {
      method: "DELETE",
      mode: "cors",
    });

    for (const row of values) {
      const data = {
        group,
        data: row,
      };

      await fetch("http://localhost:8082/rows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
    }
    setUploadedCSV(!CSVUploaded); // tell table to reload
    setSnackbar({
      open: true,
      message: "CSV uploaded!",
      severity: "success",
    });
  }

  return (
    <div className="csv-parser">
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
            <button type="button" {...getRootProps()} className="csv-button">
              <AiOutlineCloudUpload className="csv-icon cloud" /> Upload CSV
            </button>
          </div>
        )}
      </CSVReader>

      <CSVDownloader
        type={Type.Button}
        className="csv-button download"
        filename="data"
        bom
        config={{
          delimiter: ";",
        }}
        data={[
          {
            id: 1,
            name: "First Last",
            age: 20,
            gender: "Female",
            email: "firstlast@email.com",
            alternateEmail: "firstlast@hotmail.com",
          },
          {
            id: 2,
            name: "John Doe",
            age: 25,
            gender: "Male",
            email: "johndoe@gmail.com",
            alternateEmail: "john@email.com",
          },
        ]}
      >
        <AiOutlineDownload className="csv-icon download" /> Download
      </CSVDownloader>
    </div>
  );
}

export default CSVParser;
