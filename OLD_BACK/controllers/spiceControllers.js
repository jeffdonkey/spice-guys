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


// Get single spice by id from db
const getSpiceById = async (req, res) => {

    try {
        const spice = await Spice.findById(req.params.id);
        res.json(spice);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Create a new spice
const createSpice = async (req, res) => {

    try {
        const { name, tagline, image, description } = req.body;
        const spiceExists = await Spice.findOne({ name });
        
        if (spiceExists) {
            res.status(400);
            throw new Error('Spice already exists');
        }

        const spice = await Spice.create({
            name,
            tagline,
            image,
            description
        });
        
        if (spice) {
            res.status(201).json({
                _id: spice._id,
                name: spice.name,
                tagline: spice.tagline,
                image: spice.image,
                description: spice.description
            });

        } else {
            res.status(400);
            throw new Error('Invalid spice data');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
};


// Update a spice
const updateSpice = async (req, res) => {

    try {
        const { name, tagline, image, description } = req.body;
        const spice = await Spice.findById(req.params.id);

        if (spice) {
            spice.name = name;
            spice.tagline = tagline;
            spice.image = image;
            spice.description = description;
        
            const updatedSpice = await spice.save();
            res.json(updatedSpice);

        } else {
            res.status(404);
            throw new Error('Spice not found');
        }

     } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Delete a spice
const deleteSpice = async (req, res) => {
    
    try {
        const spice = await Spice.findById(req.params.id);

        if (spice) {
            await spice.remove();
            res.json({ message: 'Spice removed' });
            
        } else {
            res.status(404);
            throw new Error('Spice not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAllSpices,
    getSpiceById,
    createSpice,
    updateSpice,
    deleteSpice
};

