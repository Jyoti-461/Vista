const Registration = require("../models/Registration");

/* ---------------- EVENT RULES ---------------- */
const EVENT_RULES = {
  "Web-a-Thon": { team: true, members: 2 },
  "Valorant 5v5": { team: true, members: 6 }, // 5 + 1
  "BGMI E-Sports": { team: false, members: 1 },
};

/* ---------------- POST /api/register ---------------- */
exports.createRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      college,
      event,
      teamName,
      teamMembers,
      transactionId,
    } = req.body;

    /* ---- BASIC VALIDATION ---- */
    if (!name || !email || !college || !event || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
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

      if (
        !Array.isArray(teamMembers) ||
        teamMembers.length !== rule.members
      ) {
        return res.status(400).json({
          success: false,
          message: `Exactly ${rule.members} team members are required`,
        });
      }
    } else {
      // Solo event (BGMI)
      if (
        !Array.isArray(teamMembers) ||
        teamMembers.length !== 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Solo event requires exactly one participant",
        });
      }
    }

    /* ---- SAVE REGISTRATION ---- */
    const registration = await Registration.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      college: college.trim(),
      event,
      teamName: rule.team ? teamName.trim() : null,
      teamMembers: teamMembers.map((m) => m.trim()),
      transactionId: transactionId.trim(),
      paymentScreenshot: req.file.path,
      paymentStatus: "PENDING",
    });

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
      .find()
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
