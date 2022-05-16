const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema(
  {
    Id: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String, required: true },
    OrganizationId: { type: String, required: true },
    Groups: [
      {
        type: String,
        required: true,
      },
    ],
    Values: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Types = mongoose.model("types", TypeSchema);

module.exports = Types;
