require('dotenv').config();

const spiceSeederData = require('./data/spiceSeederData');
const connectDB = require("./db");
const Spices = require('./models/Spices');

connectDB();

const importData = async () => {
    try {
        await Spices.deleteMany({});

        await Spices.insertMany(spiceSeederData);

        console.log('Data import success');

        process.exit();

    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

importData();