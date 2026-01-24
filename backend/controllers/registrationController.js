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
  let uploadResult; // 🔴 TRACK CLOUDINARY UPLOAD FOR CLEANUP

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

    // NORMALIZE TEAM MEMBERS
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

    // 🔒 DUPLICATE TRANSACTION CHECK (BEFORE UPLOAD)
    const existing = await Registration.findOne({ transactionId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Transaction ID already exists",
      });
    }

    // ✅ CLOUDINARY UPLOAD (ONLY AFTER ALL VALIDATIONS PASS)
    uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "vista_uploads" }
    );

    const imageUrl = uploadResult.secure_url;

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
    });

    // OCR PROCESSING (UNCHANGED)
    try {
      const text = await extractTextFromImage(imageUrl);
      const parsed = parsePaymentData(text);

      const normalize = (s) => s?.toLowerCase().replace(/[^a-z0-9]/g, "");
      const verified =
        parsed.successTextFound &&
        parsed.extractedTxnIds?.some((id) =>
          normalize(id).includes(normalize(transactionId))
        );

      registration.paymentStatus = verified ? "VERIFIED" : "FLAGGED";
      registration.ocrText = text;
      registration.ocrData = parsed;
      await registration.save();
    } catch (ocrErr) {
      console.error("OCR failed:", ocrErr);
    }

    res.status(201).json({ success: true, data: registration });

  } catch (error) {
    console.error("Server error:", error);

    // 🔥 CLEANUP CLOUDINARY IF ANY ERROR AFTER UPLOAD
    if (uploadResult?.public_id) {
      await cloudinary.uploader.destroy(uploadResult.public_id);
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Transaction ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Registration failed.",
    });
  }
};
