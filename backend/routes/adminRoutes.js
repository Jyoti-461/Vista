const express = require("express");
const router = express.Router();

/**
 * ADMIN LOGIN
 * Uses credentials from .env
 */
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password required",
    });
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials",
  });
});

/**
 * ADMIN HEALTH CHECK
 */
router.get("/admin/ping", (req, res) => {
  res.json({ success: true, message: "Admin routes working" });
});

module.exports = router;
