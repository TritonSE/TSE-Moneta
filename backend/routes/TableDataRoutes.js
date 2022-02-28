/**
 * Implements routes for TableDatas. Routes will do basic validation such as
 * checking for duplicates and if all the required fields are present.
 * @summary Routes for posting, putting, and getting TableDatas
 * @author Kevin Fu
 */
const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const TableData = require("../models/TableData");
const Group = require("../models/Groups");

/**
 * Helper func that checks if provided id is an actual group in the database
 * @param id - ObjectId to check
 * @param res - response object to use for sending error
 * @returns True if id exists, else False
 */
async function isValidGroup(id, res) {
  const result = await Group.find({ 'GroupId': id });
  if (!result.length) {
    res.status(500).json({ error: "invalid group" });
    return false;
  }
  return true;
}

/**
 * POST "/row" - inserts new TableData
 * Duplicate data is if all columns are equivalent and they are in the same group return 409
 * If required values are missing return 500
 * If neither of the above is true return 200
 * Return 500 in a catch if something else goes wrong
 */
router.post("/row", [body("group").exists(), body("data").exists()], async (req, res) => {
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

/**
 * PUT "/rows/:id" - edits TableData
 * If edit results in duplicate data return 409
 * If id does not exist return 500
 * If neither of the above is true return 200
 * Return 500 in a catch if something else goes wrong
 */
router.put("/rows/:id", async (req, res) => {
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

/**
 * GET "/rows/:id" - gets TableData by id
 * If id does not exist return 500
 * If it does return 200
 * Return 500 in a catch if something else goes wrong
 */
router.get("/rows/:id", (req, res) => {
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

/**
 * GET "/rows" - gets all TableDatas
 * Return 200
 */
router.get("/rows", (req, res) => {
  TableData.find({}).then((data) => res.json(data));
});

/**
 * GET "/groups" - gets all Groups
 * Returns 200
 */
router.get("/groups", (req, res) => {
  Group.find({}).then((data) => res.json(data));
});

router.post("/search", [body("group").exists(), body("search").exists()], async (req, res) => {
  if (!(await isValidGroup(req.body.group, res))) {
    return;
  }
  const tableData = await TableData.findOne({group: req.body.group});
  const ret = []
  for (const entry of tableData.data) {
    for (const [_field, value] of Object.entries(entry)) {
      if (value.toLowerCase().includes(req.body.search.toLowerCase())) {
        ret.push(entry);
        break;
      }
    }
  }
  res.json(ret);
});

module.exports = router;
