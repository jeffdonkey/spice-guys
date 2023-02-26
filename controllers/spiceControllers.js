const Spice = require('../models/spice');

// GET all spices from db
const getAllSpices = async (req, res) => {
    try {
        const spices = await Spice.find({});
        res.json(spices);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single spice by id from db
const getSpiceById = async (req, res) => {
    try {
        const spice = await Spice.findById(req.params.id);
        res.json(spice);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    getAllSpices,
    getSpiceById
};

