/**
 * API Routes for Groups Schema
 * POST /groups
 * DELETE /groups/:id
 * PUT /groups/:id
 * GET /groups/:id
 * GET /groups
 *
 * @summary Groups routes for add, edit, delete, and get
 * @author Ainesh Arumugam
 */

const ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

const groups = require("../models/Groups");
const TableData = require("../models/TableData");

/** adds new group to database.
 * @params Name, and atleast one value
 * @return returns new group object if successfully created. Else, returns 409 or 500 errors.
 */
router.post("/groups/:orgId", async (req, res) => {
  try {
    const { Name, Values, OrganizationId } = req.body;
    const numMatched = await groups.count({ Name, OrganizationId: req.params.orgId });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Group name already registered!" });
    }

    const group = {
      Name,
      Values,
      OrganizationId,
    };

    const addGroup = await groups.create(group);

    if (addGroup) {
      return res.status(200).json({
        addGroup,
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** edits group by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.put("/groups/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const groupExists = await groups.exists({ _id: id });

    if (!groupExists) {
      return res.status(400).json({ msg: "This group does not exist!" });
    }

    const { Name, Values } = req.body;
    const group = {
      Name,
      Values,
    };

    const editGroup = await groups.findOneAndUpdate({_id: id}, group);
    const tableData = await TableData.find({group: req.params.id});

    let groupColumns = [];

    editGroup.Values.map((column, index) => {
      groupColumns[index] = column.name;
    })

    // update table data to align with new group info
    for(let row of tableData) {
      const columns = Object.keys(row.data);
      let newTableData = {};

      for(let column of columns) {
        if(groupColumns.includes(column)) {
          newTableData[column] = row.data[column];
        }
      }

      if(Object.keys(newTableData).length === 0) {
        const resp = await TableData.deleteOne({_id: row._id});
        console.log(resp);
      }
      else {
        const resp = await TableData.updateOne({_id: row._id}, {data: newTableData});
        console.log(resp);
      }
    }

    if (editGroup) {
      return res.status(200).json({
        msg: "Group edited succesfully!",
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** deletes group by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.delete("/groups/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const groupExists = await groups.exists({ _id: id });

    if (!groupExists) {
      return res.status(400).json({
        msg: "This group does not exist",
      });
    }

    const deletedGroup = await groups.findByIdAndDelete(req.params.id);

    if (deletedGroup) {
      return res.status(200).json({
        msg: "Group deleted successfully!",
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** gets group by ID from database.
 * @params mongoose id
 * @return returns group information. Else, returns 500 errors.
 */
// router.get("/groups/:id", async (req, res) => {
//   try {
//     const groupExists = await groups.exists({ _id: req.params.id });
//     if (!groupExists) {
//       return res.status(400).json({
//         msg: "This group does not exist",
//       });
//     }

//     const getGroup = await groups.findById(req.params.id);
//     if (getGroup) {
//       return res.status(200).json({
//         getGroup,
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });

/** gets all groups from database with the given orgId.
 * @return returns list of all groups. Else, returns 500 errors.
 */
router.get("/groups/:orgId", async (req, res) => {
  try {
    const listOfGroups = await groups.find({OrganizationId: req.params.orgId});
    if (listOfGroups) {
      return res.status(200).json({
        listOfGroups,
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
