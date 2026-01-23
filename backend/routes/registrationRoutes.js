const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const registrationController = require("../controllers/registrationController");
const upload = require("../middleware/upload");

/* ---------- REGISTER WITH PAYMENT PROOF ---------- */
router.post(
  "/register",
  upload.single("paymentScreenshot"),
  registrationController.createRegistration
);

/* ---------- ADMIN VERIFY ---------- */
router.patch("/register/:id/verify", async (req, res) => {
  try {
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "VERIFIED" },
      { new: true }
    );
    res.json({ success: true, data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

/* ---------- ADMIN REJECT ---------- */
router.patch("/register/:id/reject", async (req, res) => {
  try {
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "REJECTED" },
      { new: true }
    );
    res.json({ success: true, data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

/* ---------- ADMIN LIST ---------- */
router.get(
  "/register",
  registrationController.getRegistrations
);

module.exports = router;
