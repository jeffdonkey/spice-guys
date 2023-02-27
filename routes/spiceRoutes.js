const express = require('express');
const router = express.Router();

const { getAllSpices, getSpiceById } = require('../controllers/spiceControllers')


// @desc  GET all spices from db
// @route GET /api/spices
// @access Public
router.get('/', getAllSpices);


// @desc  GET a single spice by id from db
// @route GET /api/spices/:id
// @access Public
router.get('/:id', getSpiceById);


module.exports = router;
