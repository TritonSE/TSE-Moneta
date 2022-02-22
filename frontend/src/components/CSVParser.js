/**
 * Allows users to upload CSV files that get parsed into JSON objects
 * to populate the dashboard table.
 *
 * @summary CSV parser for dashboard table
 * @author Elias Fang
 */

/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useCSVReader, useCSVDownloader } from "react-papaparse";
import { AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";

import "../css/CSVParser.css";

/**
 * Calls /addRow on CSV data to upload to db.
 * @summary Uploads CSV data to db
 * @author Kevin Fu
 */
async function importToDB(values, setUploadedCSV) {
  const data = {
    group: "61f0898e595b30b05a64ee2f", // temporary dummy data
    data: values.data,
  };
  // console.log(JSON.stringify(data));
  await fetch("http://localhost:8082/addRow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  }).catch((_error) => {
    // window.alert(_error);
  });
  setUploadedCSV(true);
}

/**
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser({ setCSVUploaded }) {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <div className="csv-parser">
      <CSVReader
        // assumes csv comes with header row
        config={{
          header: true,
        }}
        onUploadAccepted={(results) => {
          importToDB(results, setCSVUploaded).then();
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
