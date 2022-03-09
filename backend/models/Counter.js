/**
 * Counter schema is used to assign readable, sequential ids for data entries
 *
 * @summary Counter schema
 * @author Navid Boloorian
 */

const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  idVal: { type: Number, default: 0 },
});

const Counter = mongoose.model("counters", CounterSchema);

<<<<<<< HEAD
if (Counter.count({ fieldName: "GroupId" }) == 0) {
=======
if (Counter.count({ fieldName: "GroupId" }) === 0) {
>>>>>>> 5564a30a841af5cae79136def675340780de8ea2
  const counter = new Counter({ fieldName: "GroupId" });
  counter.save();
}

module.exports = Counter;
