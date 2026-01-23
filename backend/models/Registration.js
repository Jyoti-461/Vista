const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    /* ---------- BASIC DETAILS ---------- */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
  type: String,
  required: true,
  match: /^[6-9]\d{9}$/ // Indian mobile validation (optional)
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
    ocrText: {
  type: String,
  default: null,
},

paymentStatus: {
  type: String,
  enum: ["PENDING", "VERIFIED", "FLAGGED", "REJECTED"],
  default: "PENDING",
},
ocrData: {
  extractedTxnId: String,
  extractedAmount: String,
  successTextFound: Boolean,
},
  },
{
    timestamps: true, 
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
