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
// @access Private/Admin
router.post('/', protect, admin, createSpice)

// Update a spice
// @route PUT /api/spices/:id
// @access Private/Admin
router.put('/:id', protect, admin, updateSpice)

// Delete a spice
// @route DELETE /api/spices/:id
// @access Private/Admin
router.delete('/:id', protect, admin, deleteSpice)


module.exports = router;
