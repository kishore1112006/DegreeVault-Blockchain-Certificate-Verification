const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    studentRegNo: {
      type: String,
      required: true,
    },

    studentWallet: {
      type: String,
      required: true,
    },

    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    course: String,
    yearOfPassing: String,
    grade: String,

    certificateHash: String, // hash of PDF
    ipfsUrl: String,         // future use
    nftTokenId: String,      // ERC721 tokenId
    txHash: String,          // blockchain transaction hash ✅

    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
