const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true, // 🔐 ADD THIS
    },

    phone: {
      type: String,
      required: true,
    },

    walletAddress: {
      type: String,
      required: true,
    },

    idProofUrl: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);