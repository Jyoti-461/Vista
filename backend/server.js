/* const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ STATIC FILES (VERY IMPORTANT)
app.use("/uploads", express.static("uploads"));

// Routes (KEEP IT CLEAN)
app.use("/api", require("./routes/registrationRoutes"));
app.use("/api", require("./routes/adminRoutes")); 

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
 */

/**
 * ============================
 * ATLAS SERVER CONFIGURATION
 * ============================
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 🔵 USE ATLAS CONNECTION
const connectAtlasDB = require("./config/db.atlas");

const app = express();

// 🔵 CONNECT TO ATLAS
connectAtlasDB();

// Middleware
app.use(cors());
app.use(express.json());

// 🚫 NO STATIC FILE STORAGE ON ATLAS / RENDER
// app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", require("./routes/registrationRoutes"));
app.use("/api", require("./routes/adminRoutes"));
app.use("/api", require("./routes/uploadRoutes"));


app.get("/", (req, res) => {
  res.send("Backend is running (Atlas)");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);