/**
 * Implements routes for TableDatas. Routes will do basic validation such as
 * checking for duplicates and if all the required fields are present.
 * @summary Routes for posting, putting, and getting TableDatas
 * @author Kevin Fu
 */
const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const Group = require("../models/Groups");
const TableData = require("../models/TableData");

/**
 * Helper func that checks if provided id is an actual group in the database
 * @param id - ObjectId to check
 * @param res - response object to use for sending error
 * @returns True if id exists, else False
 */
// async function isValidGroup(id, res) {
//   const result = await Group.find({ _id: id });
//   if (!result.length) {
//     res.status(500).json({ error: "invalid group" });
//     return false;
//   }
//   return true;
// }

/**
 * "POST /row" - inserts new TableData
 * Duplicate data is if all columns are equivalent and they are in the same group return 409
 * If required values are missing return 500
 * If neither of the above is true return 200
 * Return 500 in a catch if something else goes wrong
 */
router.post("/rows", [body("group").exists(), body("data").exists()], async (req, res) => {
  try {
    // check if all required fields are present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json(errors);
    }

    if(req.body.data[(Object.keys(req.body.data)[0])] === "") {
      res.status(409).json({error: "The first column is the primary column and must be included"})
      return;
    }

    const group = await Group.findById(req.body.group).distinct("Values");

    console.log(group);
    console.log(req.body.data)

    if (group.length < Object.keys(req.body.data).length) {
      return res.status(409).json({
        Error: "Extra fields!",
      });
    }

    let broken = false;
    const groupVals = new Set([]);

    group.forEach((value) => {
      groupVals.add(value.name);
    });

    Object.keys(req.body.data).map((val) => {
      if (groupVals.has(val)) {
        groupVals.delete(val);
      } else {
        broken = true;
      }
      return 0;
    });

    if (groupVals.size !== 0) {
      broken = true;
    }

    const missingFields = Array.from(groupVals);
    if (broken) {
      return res.status(409).json({
        Error: missingFields,
      });
    }

    // if (!(await isValidGroup(req.body.group, res))) {
    //  return;
    // }

    return await TableData.find({ group: req.body.group, data: req.body.data })
      .then(async (data) => {
        if (data.length) {
          // check if inserting duplicate
          return res.status(409).json({ error: "Duplicate data" });
        }
        const tableData = new TableData({
          group: req.body.group,
          data: req.body.data,
        });
        await tableData.save().catch((err) => res.status(500).json("Error: " + err));
        return res.status(200).json("Posted TableData!");
      })
      .catch((error) => res.status(500).json({error: "Server error"}));
  } catch (error) {
    return res.status(500).json({error: "Server error"});
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
    const tableData = await TableData.find({ _id: req.params.id });

    if(req.body.data[(Object.keys(req.body.data)[0])] === "") {
      res.status(409).json({error: "The first column is the primary column and must be included"})
    }
    else if (!tableData.length) {
      // if .find returns empty array
      res.status(500).json({ error: "Row not found" });
    } else {
      await TableData.updateOne({ _id: req.params.id }, req.body).catch((error) => {
        res.status(500).json({error: "Server error"});
      });
      res.json(tableData);
    }
  } catch (error) {
    res.status(500).json({error: "Server error"});
  }
});

/**
 * "GET /rows?<queries>" - gets all TableDatas according to <queries>
 * e.g /rows?_id=123 gets TableData with _id=123
 * Return 200 if successful, else return 500
 */
router.get("/rows", (req, res) => {
  try {
    TableData.find(req.query).sort({createdAt: -1})
      .exec()
      .then((data) => {
        if (!data.length) {
          res.status(500).json({ error: "No matching results" });
          return;
        }
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * "DELETE /rows?<queries>" - deletes all TableDatas according to <queries>
 * e.g /rows?_id=123 deletes TableData with _id=123
 * Return 200 if successful, else return 500
 */
router.delete("/rows", (req, res) => {
  try {
    TableData.deleteMany(req.query)
      .exec()
      .then((data) => {
        if (data.deletedCount === 0) {
          res.status(500).json({ error: "No matching results" });
          return;
        }
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json("Server error");
      });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

/**
 * "POST /search" - searches for all rows with the correct group and search query
 * Return 200 if successful, else return 500
 */
router.post("/search", [body("group").exists(), body("search").exists()], async (req, res) => {
  try {
    const tableData = await TableData.find({"group": {$eq: req.body.group}});

    const ret = [];
    for (const row of tableData) {
      for (const [_field, value] of Object.entries(row.data)) {
        if (value.toLowerCase().includes(req.body.search.toLowerCase())) {
          ret.push(row);
          break;
        }
      }
    }

    res.json(ret);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
