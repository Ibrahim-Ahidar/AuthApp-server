const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4
        });
    } catch (err) {
        console.error(`MongoDB connection failed: ${err.code || err.name} - retrying in 5s`);
        setTimeout(connectDb, 5000);
    }
}

module.exports = connectDb;