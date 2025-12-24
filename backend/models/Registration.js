const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    college: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
