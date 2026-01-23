const express = require("express");
const router = express.Router();

router.get("/admin/ping", (req, res) => {
  res.json({ success: true, message: "Admin routes working" });
});

module.exports = router;
