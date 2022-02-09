/**
 * API Routes for Users Schema
 * POST (/addUser)
 * DELETE (/deleteUser/:id)
 * PUT (/editUser/:id)
 * GET (/getUser/:id)
 * GET (/getAllUsers)
 * *
 * @summary Users routes for add, edit, delete, and get
 * @author Pratyush Chand
 */

const express = require("express");
const User = require("../models/Users");

const router = express.Router();

const Users = require("../models/Users");

/** adds new user to database.
 * @params fullName, email, companyID, and password
 * @return returns new user object if successfully created. Else, returns 409 or 500 errors.
 */

router.post("/addUser", async (req, res) => {
  try {
    const { fullName, email, companyID, password } = req.body;

    const numMatched = await Users.count({ email });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Email already registered" });
    }

    const user = {
      fullName,
      email,
      companyID,
      password,
    };

    const addUser = await Users.create(user);

    if (addUser) {
      return res.status(200).json({
        addUser,
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

/** deletes user by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 500 errors.
 */
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userExists = await User.exists({ _id: req.params.id });

    if (!userExists) {
      return res.status(400).json({
        msg: "Such a user does not exist!",
      });
    }

    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      return res.status(200).json({
        msg: "success",
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

/** edits user by ID from database.
 * @params mongoose id and fullname/email/companyId/password
 * @return returns success message. Else, returns 500 errors.
 */
router.put("/editUser/:id", async (req, res) => {
  try {
    const userExists = await User.exists({ _id: req.params.id });

    if (!userExists) {
      return res.status(400).json({
        msg: "Such a user does not exist!",
      });
    }

    const { fullName, email, companyID, password } = req.body;

    const user = {
      fullName,
      email,
      companyID,
      password,
    };

    const editUser = await Users.findOneAndUpdate(req.params.id, user);

    if (editUser) {
      return res.status(200).json({
        msg: "successfully edited!",
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

/** gets user by ID from database.
 * @params mongoose id
 * @return returns user object. Else, returns 400 or 500 errors.
 */
router.get("/getUser/:id", async (req, res) => {
  try {
    const userExists = await User.exists({ _id: req.params.id });

    if (!userExists) {
      return res.status(400).json({
        msg: "_id does not exist!",
      });
    }

    const getUser = await Users.findById(req.params.id);

    if (getUser) {
      return res.status(200).json({
        getUser,
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

/** gets all users from data base
 * @return list of users. Else, returns 500 errors.
 */
router.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await Users.find();

    if (allUsers) {
      return res.status(200).json({
        allUsers,
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
