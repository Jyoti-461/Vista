const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    /* ---------- BASIC DETAILS ---------- */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },

    event: {
      type: String,
      enum: ["Web-a-Thon", "Valorant 5v5", "BGMI E-Sports"],
      required: true,
    },

    /* ---------- TEAM DETAILS ---------- */
    teamName: {
      type: String,
      trim: true,
      default: null,
    },

    teamMembers: {
      type: [String],
      default: [],
      validate: {
        validator: function (members) {
          if (this.event === "Web-a-Thon") return members.length === 2;
          if (this.event === "Valorant 5v5") return members.length === 6;
          if (this.event === "BGMI E-Sports") return members.length === 1;
          return false;
        },
        message: "Invalid number of team members for selected event",
      },
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    paymentScreenshot: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Registration", registrationSchema);
