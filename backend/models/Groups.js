/**
 * Schema for Groups with the properties
 * Name (string)
 * Values (array of json objects(name, type))
 * Timestamps
 *
 * @summary Groups schema
 * @author Ainesh Arumugam
 */

const mongoose = require("mongoose");
const Counter = require("../models/Counter");

const GroupSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, index: true },
    Values: [{ name: { type: String, required: true }, type: { type: String, required: true } }],
    GroupId: { type: Number, required: true, index: true, default: 0}
  },
  { timestamps: true }
);

GroupSchema.pre('save', async function() {
    const counter = await Counter.find({'fieldName': 'GroupId'});
    this.GroupId = counter[0].idVal;
    await Counter.updateOne({'fieldName': 'GroupId'}, {$inc: {'idVal': 1}});
})

const Group = mongoose.model("groups", GroupSchema);

module.exports = Group;
