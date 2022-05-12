/**
 * Flow for creating a new custom data type. (To be made)
 *
 * @summary Flow for creating a new custom data type.
 * @author Alex Zhang
 */

/**
 * Finds distinct values under a given column in CSV data.
 * These values are used to make a new custom data type before uploading a new
 * CSV, so all values under the column fit under the new data type.
 * @param {Array} CSVData Array of rows containing value from the CSV.
 * @param {string} type String name for the column field to search for distinct value
 * @returns A Set containing all distinct values under the given type
 */
function getDistinctValues(CSVData, type) {
  const ret = new Set();
  for (const row of CSVData) {
    ret.add(CSVData[type]);
  }
  return ret;
}
