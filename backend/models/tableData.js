/**
 * Schema for table data with fields 'group' and 'data'. 'group' contains a
 * reference to a Group model. 'data' contains a json document.
 *
 * @summary schema for table data
 * @author Kevin Fu
 */
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const tableDataSchema = mongoose.Schema(
  {
    group: {
      type: ObjectId,
      ref: "users",
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
