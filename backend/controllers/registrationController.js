const Registration = require("../models/Registration");
const { extractTextFromImage } = require("../utils/ocr");
const { parsePaymentData } = require("../utils/paymentParser");
const cloudinary = require("../config/cloudinary");

const EVENT_RULES = {
  "Web-a-Thon": { members: 1 },
  "BGMI E-Sports": { members: 4 },
  "Valorant 5v5": { members: 5 },
};

exports.createRegistration = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const {
      name,
      mobile,
      college,
      event,
      teamName,
      teamMembers,
      transactionId,
    } = req.body;

    // BASIC VALIDATIONS
    if (!name || !mobile || !college || !event || !transactionId) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Payment screenshot required" });
    }

    const rule = EVENT_RULES[event];
    if (!rule) {
      return res.status(400).json({ success: false, message: "Invalid event" });
    }

    const normalizedMembers = Array.isArray(teamMembers)
      ? teamMembers
      : teamMembers
      ? [teamMembers]
      : [];

    if (!teamName?.trim()) {
      return res.status(400).json({ success: false, message: "Team name required" });
    }

    if (normalizedMembers.length !== rule.members) {
      return res.status(400).json({
        success: false,
        message: `Exactly ${rule.members + 1} players required (including leader)`,
      });
    }
if (!/^\d{12}$/.test(transactionId.trim())) {
  return res.status(400).json({
    success: false,
    message: "Invalid UPI transaction ID",
  });
}

    

    // ✅ CLOUDINARY UPLOAD (ONLY AFTER ALL CHECKS PASS)
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "vista_uploads" }
    );

    const imageUrl = uploadResult.secure_url;
    uploadedPublicId = uploadResult.public_id;

    // CREATE REGISTRATION
    const registration = await Registration.create({
      name: name.trim(),
      mobile: mobile.trim(),
      college: college.trim(),
      event,
      teamName: teamName.trim(),
      teamMembers: normalizedMembers.map((m) => m.trim()),
      transactionId: transactionId.trim(),
      paymentScreenshot: imageUrl,
      paymentStatus: "PENDING_OCR",
    });

setImmediate(async () => {
  try {
    const { text, words } = await extractTextFromImage(imageUrl);

    const parsed = parsePaymentData({
      ocrText: text,
      ocrWords: words,
    });

    const userTxn = registration.transactionId.trim();

    let finalStatus = "FLAGGED_FOR_REVIEW";
    const finalFlags = [...parsed.flags];

    /* -------------------------------------------------
       HARD TXN MATCH — NO COMPROMISE
    --------------------------------------------------*/

    if (parsed.extractedTxnIds.length !== 1) {
      finalFlags.push("TXN_ID_COUNT_INVALID");
    } else {
      const ocrTxn = parsed.extractedTxnIds[0].trim();

      if (ocrTxn !== userTxn) {
        finalFlags.push("TXN_ID_MISMATCH");
      }
    }

    /* -------------------------------------------------
       FINAL STATUS DECISION
    --------------------------------------------------*/

    if (finalFlags.length === 0) {
      finalStatus = "OCR_CLEAN_MATCH";
    }

    await Registration.updateOne(
      { _id: registration._id },
      {
        $set: {
          ocrText: text,
          ocrData: {
            extractedTxnIds: parsed.extractedTxnIds,
            flags: finalFlags,
          },
          paymentStatus: finalStatus,
        },
      }
    );
  } catch (err) {
    console.error("Async OCR failed:", err.message);
    await Registration.updateOne(
      { _id: registration._id },
      { $set: { paymentStatus: "FLAGGED_FOR_REVIEW" } }
    );
  }
});



    res.status(201).json({ success: true, data: registration });
    

  } catch (error) {
    console.error("Server error:", error);

    // 🧹 CLEANUP: delete uploaded image if something failed AFTER upload
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId);
      } catch (cleanupErr) {
        console.error("Cloudinary cleanup failed:", cleanupErr);
      }
    }

    res.status(500).json({
      success: false,
      message: "Server error. Registration failed.",
    });
  }
};


exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
