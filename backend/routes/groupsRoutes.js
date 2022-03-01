/**
 * API Routes for Groups Schema
 * POST /groups
 * DELETE /groups/:id
 * PUT /groups/:id
 * GET /groups/:id
 * GET /groups
 *
 * @summary Companies routes for add, edit, delete, and get
 * @author Pratyush Chand
 */

const express = require("express");


const router = express.Router();

const companies = require("../models/Organizations");
const groups = require("../models/Groups");

/** adds new group to database.
 * @params Name, and atleast one value
 * @return returns new group object if successfully created. Else, returns 409 or 500 errors.
 */
router.post("/companies", async (req, res) => {
  try {
    const { Name, Values } = req.body;
    const numMatched = await companies.count({ Name });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Name already registered!" });
    }

    const group = {
      Name,
      Values
    };

    const addGroup = await companies.create(group);

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
    const groupExists = await groups.exists({ _id: req.params.id });

    if (!groupExists) {
      return res.status(400).json({ msg: "This group does not exist!" });
    }

    const { Name, Values } = req.body;
    const company = {
      Name,
      Values
    };

    const editGroup = await groups.findOneAndUpdate(req.params.id, group);
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
    const groupExists = await groups.exists({ _id: req.params.id });

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
router.get("/groups/:id", async (req, res) => {
  try {
    const groupExists = await groups.exists({ _id: req.params.id });
    if (!groupExists) {
      return res.status(400).json({
        msg: "This group does not exist",
      });
    }

    const getGroup = await groups.findById(req.params.id);
    if (getGroup) {
      return res.status(200).json({
        getGroup,
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

/** gets all groups from database.
 * @return returns list of all companies. Else, returns 500 errors.
 */
router.get("/groups", async (req, res) => {
  try {
    const listOfCompanies = await companies.find();
    if (listOfCompanies) {
      return res.status(200).json({
        listOfCompanies,
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
