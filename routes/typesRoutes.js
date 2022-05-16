const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const Types = require("../models/Types");

const router = express.Router();

router.post("/types", async (req, res) => {
  try {
    const { Name, OrganizationId, Groups, Values } = req.body;

    const type = {
      Name,
      OrganizationId,
      Groups,
      Values,
    };

    const addType = await Types.create(type);

    if (addType) {
      return res.status(200).json({ addType });
    }

    return res.status(500).json({ Error: "Error" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

router.put("/types/:typeId", async (req, res) => {
  try {
    const id = new ObjectId(req.params.typeId);

    const typeExists = await Types.exists({ _id: id });

    if (!typeExists) {
      return res.status(400).json({
        msg: "Such a type does not exist",
      });
    }

    const { Name, OrganizationId, Groups, Values } = req.body;

    const type = {
      Name,
      OrganizationId,
      Groups,
      Values,
    };

    const editType = await Types.findByIdAndUpdate(req.params.typeId, type);

    if (editType) {
      return res.status(200).json({
        editType,
      });
    }

    return res.status(500).json({ Error: "Error" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

router.delete("/types/:typeId", async (req, res) => {
  try {
    const typeExists = Types.exists({ _id: req.params.id });
    if (!typeExists) {
      return res.status(500).json({ Error: "Error" });
    }

    const deleteType = Types.findByIdAndDelete(req.params.id);
    if (deleteType) {
      return res.status(200).json({ msg: "Success!" });
    }

    return res.status(500).json({ Error: "Error" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
