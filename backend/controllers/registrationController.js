const Registration = require("../models/Registration");

// POST /api/register
exports.createRegistration = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/register (Admin use later)
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
