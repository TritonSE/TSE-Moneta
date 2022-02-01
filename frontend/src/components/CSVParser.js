/**
 * Allows users to upload CSV files that get parsed into JSON objects
 * to populate the dashboard table.
 *
 * @summary CSV parser for dashboard table
 * @author Elias Fang
 */

import React from 'react';
import { useCSVReader, useCSVDownloader } from 'react-papaparse';
import { AiOutlineCloudUpload, AiOutlineDownload } from 'react-icons/ai'

import "../css/CSVParser.css";

/**
 * Renders the CSV parser
 * @returns CSV parser content
 */
function CSVParser() {
    const { CSVReader } = useCSVReader();
    const { CSVDownloader, Type } = useCSVDownloader();

    return (
        <div className='csv-parser'>
            <CSVReader onUploadAccepted={(results) => {
                console.log(results);
            }}>
                {({
                    getRootProps,
                }) => (
                    <>
                        <div>
                            <button type='button' {...getRootProps()} className='csv-button'>
                                <AiOutlineCloudUpload /> Upload CSV
                            </button>
                        </div>
                    </>
                )}
            </CSVReader>

            <CSVDownloader
                type={TypeError.Button}
            >

            </CSVDownloader>
        </div>
    );
}

export default CSVParser;