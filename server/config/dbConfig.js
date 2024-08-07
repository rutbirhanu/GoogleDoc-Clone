const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async (dbURI) => {
    if (mongoose.connection.readyState === 1) {
        console.log('Database is already connected');
        return;
    }

    try {
        await mongoose.connect(dbURI);
        console.log(`connected to db: ${dbURI}`);
    } catch (err) {
        console.error('error has occurred', err);
    }
};

module.exports = connectDB;
