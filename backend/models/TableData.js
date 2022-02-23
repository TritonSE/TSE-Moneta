/**
 * Schema for table data with fields 'group' and 'data'. 'group' contains a
 * reference to a Group model. 'data' contains a json document.
 *
 * @summary schema for table data
 * @author Kevin Fu
 */

const mongoose = require("mongoose");

const tableDataSchema = mongoose.Schema(
  {
    group: {
      type: Number,
      required: true,
    },
    data: {
      type: JSON,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tableData", tableDataSchema);
