/**
 *
 */
const express = require("express");
const router = express.Router();
const TableData = require("../models/tableData");
const Group = require("../models/Groups");

router.post("/addRow", (req, res) => {
  const tableData = new TableData({
    group: req.body.group,
    data: req.body.data,
  });
  console.log("a");
  tableData.save();
  res.send("Posted TableData!");
});

router.put("/editRow/:id", (req, res) => {
  TableData.updateOne({ _id: req.params.id }, req.body);
});

router.get("/getAllRows/:id", (req, res) => {
  TableData.find({
    _id: req.params.id,
  })
    .exec()
    .then((data) => {
      res.send(data);
      console.log(data);
    });
});

router.get("/getAllRows", (req, res) => {
  TableData.find({})
    .exec()
    .then((data) => res.send(data));
});

module.exports = router;
