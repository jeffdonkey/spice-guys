const express = require("express");
const router = express.Router();
// const authenticateuser = require("../middleware/authenticateuser");
const Spices = require("../models/Spices");
const { validationResult } = require("express-validator");

// GET all spices at /api/spices/fetchallspices
router.get("/fetchallspices", async (req, res) => {
  try {
    const spices = await Spices.find({});
    res.json(spices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// POST new spice at /api/spices/addspice
router.post(
  "/addspice",
  async (req, res) => {
    try {
      const { name, image, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const spice = new Spices({
        name,
        image,
        description
      });
      const savedSpice = await spice.save();
      res.json(savedSpice);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// Edit an existing spice at /api/spices/updatespice/:id
router.put("/updatespice/:id", async (req, res) => {
  const { name, image, description } = req.body;
  try {
    const newSpice = {};
    if (name) {
      newSpice.name = name;
    }
    if (image) {
      newSpice.image = image;
    }
    if (description) {
      newSpice.description = description;
    }

    // Find spice to be updated and edit it
    let spice = await Spices.findById(req.params.id);
    if (!spice) {
      return res.status(404).send("Not found");
    }
    spice = await Spices.findByIdAndUpdate(
      req.params.id,
      { $set: newSpice },
      { new: true }
    );
    res.json({ spice });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Delete an existing spice using DELETE - at /api/spices/deletespice/:id
router.delete("/deletespice/:id", async (req, res) => {
  try {
    let spice = await Spices.findById(req.params.id);
    if (!spice) {
      return res.status(404).send("Not found");
    }
    spice = await Spices.findByIdAndDelete(req.params.id);
    res.json({
      Success: `Spice with id ${req.params.id} has been deleted`,
      spice: spice,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
