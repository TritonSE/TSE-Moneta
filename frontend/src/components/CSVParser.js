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
 * Calls POST /row on CSV data to upload to db.
 *
 * @author Kevin Fu
 */
async function importToDB(values, CSVUploaded, setUploadedCSV) {
  const group = "61f0898e595b30b05a64ee2f"; // temporary dummy data, should be determined by drop-down menu

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
}

/**
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser({ CSVUploaded, setCSVUploaded }) {
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
