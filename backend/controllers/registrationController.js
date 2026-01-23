const Registration = require("../models/Registration");
const { extractTextFromImage } = require("../utils/ocr");
const { parsePaymentData } = require("../utils/paymentParser");

/* ---------------- EVENT RULES ---------------- */
const EVENT_RULES = {
  "Web-a-Thon": { team: true, members: 2 },
  "Valorant 5v5": { team: true, members: 6 },
  "BGMI E-Sports": { team: false, members: 1 },
};

/* ---------------- POST /api/register ---------------- */
exports.createRegistration = async (req, res) => {
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

    /* ---- BASIC VALIDATION ---- */
    if (!name || !mobile || !college || !event || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    /* ---- MOBILE VALIDATION ---- */
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    const rule = EVENT_RULES[event];
    if (!rule) {
      return res.status(400).json({
        success: false,
        message: "Invalid event selected",
      });
    }

    /* ---- DUPLICATE TRANSACTION CHECK ---- */
    const txnExists = await Registration.findOne({ transactionId });
    if (txnExists) {
      return res.status(409).json({
        success: false,
        message: "Transaction ID already used",
      });
    }

    /* ---- TEAM VALIDATION ---- */
    if (rule.team) {
      if (!teamName || teamName.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Team name is required for this event",
        });
      }

      if (!Array.isArray(teamMembers) || teamMembers.length !== rule.members) {
        return res.status(400).json({
          success: false,
          message: `Exactly ${rule.members} team members are required`,
        });
      }
    } else {
      if (!Array.isArray(teamMembers) || teamMembers.length !== 1) {
        return res.status(400).json({
          success: false,
          message: "Solo event requires exactly one participant",
        });
      }
    }

    /* ---- CREATE REGISTRATION (INITIAL) ---- */
    const registration = await Registration.create({
      name: name.trim(),
      mobile: mobile.trim(),
      college: college.trim(),
      event,
      teamName: rule.team ? teamName.trim() : null,
      teamMembers: teamMembers.map((m) => m.trim()).filter(Boolean),
      transactionId: transactionId.trim(),
      paymentScreenshot: req.file.path,
      paymentStatus: "PENDING",
    });

    /* ---- OCR PROCESSING ---- */
    const text = await extractTextFromImage(req.file.path);
    const parsed = parsePaymentData(text);

    /* ---- NORMALIZATION FUNCTION ---- */
    const normalize = (s) =>
      s?.toLowerCase().replace(/[^a-z0-9]/g, "");

    const userTxn = normalize(transactionId);

    let verified = false;
    if (Array.isArray(parsed.extractedTxnIds)) {
      for (const id of parsed.extractedTxnIds) {
        if (normalize(id).includes(userTxn)) {
          verified = true;
          break;
        }
      }
    }

    /* ---- FINAL PAYMENT STATUS ---- */
    registration.paymentStatus =
      parsed.successTextFound && verified ? "VERIFIED" : "FLAGGED";

    registration.ocrText = text;
    registration.ocrData = parsed;

    await registration.save();

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Registration failed.",
    });
  }
};

/* ---------------- GET /api/register (Admin) ---------------- */
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration
      .find({}, "-email") // ensure email is never sent
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
