/**
 * API Routes for Users Schema
 * POST /users
 * DELETE /users/:id
 * PUT /users/:id
 * GET /users/:id
 * GET /users
 *
 * @summary Users routes for add, edit, delete, and get
 * @author Pratyush Chand
 */

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

const router = express.Router();

const Users = require("../models/Users");

/** adds new user to database.
 * @params fullName, email, companyID, and password
 * @return returns new user object if successfully created. Else, returns 409 or 500 errors.
 */

router.post("/users", async (req, res) => {
  try {
    const { fullName, email, organizationId } = req.body;

    const numMatched = await Users.count({ email });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Email already registered" });
    }

    const user = {
      fullName,
      email,
      organizationId,
    };

    console.log(req.body);
    console.log(user);

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
router.delete("/users/:id", async (req, res) => {
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
router.put("/users/:id", async (req, res) => {
  try {
    const userExists = await User.exists({ _id: req.params.id });

    if (!userExists) {
      return res.status(400).json({
        msg: "Such a user does not exist!",
      });
    }

    const { fullName, email, organizationId, password } = req.body;

    const user = {
      fullName,
      email,
      organizationId,
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
router.get("/users", async (req, res) => {
  try {
    const userExists = await User.exists(req.query);

    if (!userExists) {
      return res.status(400).json({
        msg: "User does not exist!",
      });
    }

    const getUser = await Users.find(req.query);

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

/**
 * Verifies login info
 * @returns 404 if email not found, 400 if invalid password, 500 is error, 200 if valid
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login Successful!" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
