const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const tableDataSchema = mongoose.Schema(
  {
    group: {
      type: ObjectId,
      ref: "Group",
      required: true,
    },
    data: {
      type: JSON,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableData", tableDataSchema);
