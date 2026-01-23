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
router.patch("/register/:id/verify", async (req, res) => {
  try {
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "VERIFIED" },
      { new: true }
    );
    res.json({ success: true, data: reg });
  } catch {
    res.status(500).json({ success: false });
  }
});

router.patch("/register/:id/reject", async (req, res) => {
  try {
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "REJECTED" },
      { new: true }
    );
    res.json({ success: true, data: reg });
  } catch {
    res.status(500).json({ success: false });
  }
});


/* ---------- ADMIN ---------- */
router.get("/register", getRegistrations);

module.exports = router;
