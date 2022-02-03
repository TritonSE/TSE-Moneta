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
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser() {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <div className="csv-parser">
      <CSVReader
        onUploadAccepted={(results) => {
          console.log(results);
        }}
      >
        {({ getRootProps }) => (
          <div>
            <button type="button" {...getRootProps()} className="csv-button">
              <AiOutlineCloudUpload /> Upload CSV
            </button>
          </div>
        )}
      </CSVReader>

      <CSVDownloader
        type={Type.Button}
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
        <AiOutlineDownload /> Download
      </CSVDownloader>
    </div>
  );
}

export default CSVParser;
