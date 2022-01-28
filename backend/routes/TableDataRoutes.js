/**
 * "/addRow" - inserts new TableData
 * Duplicate data is if all columns are equivalent and they are in the same group return 409
 * If required values are missing return 500
 * If neither of the above is true return 200
 * Return 500 in a catch if something else goes wrong
 *
 * "/editRow:id" - edits TableData
 * If edit results in duplicate data return 409
 * If id does not exist return 500
 * If neither of the above is true return 200
 * Return 500 in a catch if something else goes wrong
 *
 * "/getRow/:id" - gets TableData by id
 * If id does not exist return 500
 * If it does return 200
 * Return 500 in a catch if something else goes wrong
 *
 * "/getAllRows" - gets all TableDatas
 * Return 200
 * @summary Routes for TableData
 * @author Kevin Fu
 */
const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const TableData = require("../models/TableData");
const Group = require("../models/Groups");

// checks if Group ref exists
async function isValidGroup(id, res) {
  const result = await Group.find({ _id: id });
  if (!result.length) {
    res.status(500).json({ error: "invalid group" });
    return false;
  }
  return true;
}

router.post("/addRow", [body("group").exists(), body("data").exists()], async (req, res) => {
  try {
    // check if all required fields are present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }
    if (!(await isValidGroup(req.body.group, res))) {
      return;
    }

    TableData.find({ group: req.body.group, data: req.body.data })
      .then((data) => {
        if (data.length) {
          // check if inserting duplicate
          res.status(409).json({ error: "Duplicate data" });
        } else {
          const tableData = new TableData({
            group: req.body.group,
            data: req.body.data,
          });
          tableData
            .save()
            .then(res.json("Posted TableData!"))
            .catch((err) => res.status(500).json("Error: " + err));
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/editRow/:id", async (req, res) => {
  try {
    if (!(await isValidGroup(req.body.group, res))) {
      return;
    }
    const tableData = await TableData.find({ _id: req.params.id });
    if (!tableData.length) {
      // if .find returns empty array
      res.status(500).json({ error: "id not found" });
    } else if (tableData.group === req.body.group && tableData.data === req.body.data) {
      // if edit results in duplicate data
      res.status(409).json({ error: "duplicate data" });
    } else {
      await TableData.updateOne({ _id: req.params.id }, req.body).catch((error) => {
        res.status(500).json(error);
      });
      res.json(tableData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getAllRows/:id", (req, res) => {
  try {
    TableData.find({ _id: req.params.id })
      .then((data) => {
        if (!data.length) {
          // if find returns empty array
          res.status(500).json({ error: "id not found" });
        } else {
          res.json(data);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getAllRows", (req, res) => {
  TableData.find({}).then((data) => res.json(data));
});

module.exports = router;
