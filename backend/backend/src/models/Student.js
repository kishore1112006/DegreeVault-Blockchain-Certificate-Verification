const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
      nonce: {
        type: String,
        },
    name: {
      type: String,
      required: true,
    },

    regNo: {
      type: String,
      required: true,
      unique: true,
    },

    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
  type: String,
},

otpExpiresAt: {
  type: Date,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
