require('dotenv').config({ path: './config.env' });

const spiceSeederData = require('./data/spiceSeederData');
const connectDB = require('./config/db');
const Spice = require('./models/spice');

connectDB();

const importData = async () => {
    try {
        await Spice.deleteMany({});

        await Spice.insertMany(spiceSeederData);

        console.log('Data import success');

        process.exit();

    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

importData();