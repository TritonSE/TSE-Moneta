const express = require("express");

const router = express.Router();

// Load Users model
const Users = require("../models/Users");

// /addUser

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
        Message: "Success",
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

// remove route to be added

router.put("/editUser/:id", (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      res.statusCode(400).json({ error: err });
    });
});

router.get("/getUser/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      res.statusCode(400).json({ error: err });
    });
});

router.get("/getAllUsers", (req, res) => {
  Users.find()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      res.statusCode(400).json({ error: err });
    });
});

module.exports = router;
