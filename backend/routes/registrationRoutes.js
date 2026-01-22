const express = require("express");
const {
  createRegistration,
  getRegistrations,
} = require("../controllers/registrationController");

const upload = require("../middleware/upload"); // ✅ STEP 5

const router = express.Router();

/* ---------- REGISTER WITH PAYMENT PROOF ---------- */
router.post(
  "/register",
  upload.single("paymentScreenshot"), // ✅ STEP 5
  createRegistration
);

/* ---------- ADMIN ---------- */
router.get("/register", getRegistrations);

module.exports = router;
