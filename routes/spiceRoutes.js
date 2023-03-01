const express = require('express');
const router = express.Router();

const {
  getAllSpices,
  getSpiceById,
  createSpice,
  updateSpice,
  deleteSpice,
} = require("../controllers/spiceControllers");


// @desc  GET all spices from db
// @route GET /api/spices
// @access Public
router.get('/api/spices', getAllSpices);


// @desc  GET a single spice by id from db
// @route GET /api/spices/:id
// @access Public
router.get('/api/spices/:id', getSpiceById);


// Create a new spice
// @route POST /api/spices
// router.post('/', protect, admin, createSpice)
router.post('/', createSpice)

// Update a spice
// @route PUT /api/spices/:id
// router.put('/:id', protect, admin, updateSpice)
router.put('/:id', updateSpice)

// Delete a spice
// @route DELETE /api/spices/:id
// router.delete('/:id', protect, admin, deleteSpice)
router.delete('/:id', deleteSpice)


module.exports = router;
