const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    mobile: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },

    college: { type: String, required: true, trim: true },

    event: {
      type: String,
      enum: ["Web-a-Thon", "Valorant 5v5", "BGMI E-Sports"],
      required: true,
    },

    teamName: { type: String, trim: true, default: null },

    teamMembers: {
      type: [String],
      default: [],
    },

    transactionId: { type: String, required: true, index: true },


    paymentScreenshot: { type: String, required: true },

    ocrText: { type: String, default: null },

    paymentStatus: {
  type: String,
  enum: [
    "PENDING_OCR",
    "OCR_CLEAN_MATCH",
    "FLAGGED_FOR_REVIEW",
    "REJECTED"
  ],
  default: "PENDING_OCR",
},


   ocrData: {
  extractedTxnIds: [String],
  flags: [String],
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
