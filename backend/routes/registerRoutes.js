const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// CREATE
router.post("/register", async (req, res) => {
  const data = await Registration.create(req.body);
  res.json(data);
});

// READ
router.get("/register", async (req, res) => {
  const data = await Registration.find().sort({ createdAt: -1 });
  res.json(data);
});

// ✅ DELETE (THIS MUST EXIST)
router.delete("/register/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
