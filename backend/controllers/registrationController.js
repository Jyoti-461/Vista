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

    // 🔒 DUPLICATE TRANSACTION CHECK (BEFORE CLOUDINARY)
    const exists = await Registration.findOne({ transactionId: transactionId.trim() });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Transaction ID already exists",
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
    });

    // OCR (SAFE)
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
