/**
 * API Routes for Organizations Schema
 * POST /organizations
 * DELETE /organizations/:id
 * PUT /organizations/:id
 * GET /organizations/:id
 * GET /organizations
 *
 * @summary Organizations routes for add, edit, delete, and get
 * @author Pratyush Chand
 */

const express = require("express");

const router = express.Router();

const organizations = require("../models/Organizations");

/** adds new company to database.
 * @params Name, Email, and Password
 * @return returns new company object if successfully created. Else, returns 409 or 500 errors.
 */
router.post("/organizations", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const numMatched = await organizations.count({ Email });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Email already registered!" });
    }

    const company = {
      Name,
      Email,
      Password,
    };

    const addCompany = await organizations.create(company);

    if (addCompany) {
      return res.status(200).json({
        addCompany,
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

/** edits company by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.put("/organizations/:id", async (req, res) => {
  try {
    const companyExists = await organizations.exists({ _id: req.params.id });

    if (!companyExists) {
      return res.status(400).json({ msg: "This company does not exist!" });
    }

    const { Name, Email, Password } = req.body;
    const company = {
      Name,
      Email,
      Password,
    };

    const editCompany = await organizations.findOneAndUpdate(req.params.id, company);
    if (editCompany) {
      return res.status(200).json({
        msg: "Company edited succesfully!",
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

/** deletes company by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.delete("/organizations/:id", async (req, res) => {
  try {
    const companyExists = await organizations.exists({ _id: req.params.id });

    if (!companyExists) {
      return res.status(400).json({
        msg: "This company does not exist",
      });
    }

    const deletedCompany = await organizations.findByIdAndDelete(req.params.id);

    if (deletedCompany) {
      return res.status(200).json({
        msg: "Company deleted successfully!",
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

/** gets company by ID from database.
 * @params mongoose id
 * @return returns company information. Else, returns 500 errors.
 */
router.get("/organizations/:id", async (req, res) => {
  try {
    const companyExists = await organizations.exists({ _id: req.params.id });
    if (!companyExists) {
      return res.status(400).json({
        msg: "This company does not exist",
      });
    }

    const getCompany = await organizations.findById(req.params.id);
    if (getCompany) {
      return res.status(200).json({
        getCompany,
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

/** gets all organizations from database.
 * @return returns list of all organizations. Else, returns 500 errors.
 */
router.get("/organizations", async (req, res) => {
  try {
    const listOfOrganizations = await organizations.find();
    if (listOfOrganizations) {
      return res.status(200).json({
        listOfOrganizations,
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