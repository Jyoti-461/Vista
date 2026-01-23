/**
 * ATLAS DATABASE CONNECTION
 * Used for: Render / Production
 * MongoDB Atlas (Cloud)
 */

const mongoose = require("mongoose");

const connectAtlasDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Atlas connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectAtlasDB;
