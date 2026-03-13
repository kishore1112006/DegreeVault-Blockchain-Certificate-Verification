const express = require("express");
const router = express.Router(); // ✅ THIS LINE WAS MISSING

const Certificate = require("../models/Certificate");

// VERIFY CERTIFICATE
router.get("/", async (req, res) => {
  try {
    const { tokenId, txHash, certificateHash } = req.query;

    if (!tokenId && !txHash && !certificateHash) {
      return res.status(400).json({
        valid: false,
        message: "Verification parameter required",
      });
    }

    const query = {};
    if (tokenId) query.nftTokenId = tokenId;
    if (txHash) query.txHash = txHash;
    if (certificateHash) query.certificateHash = certificateHash;

    const certificate = await Certificate.findOne(query).populate(
      "universityId",
      "name"
    );

    if (!certificate) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found",
      });
    }

    res.json({
      valid: true,
      certificate: {
        university: certificate.universityId.name,
        course: certificate.course,
        year: certificate.yearOfPassing,
        grade: certificate.grade,
        nftTokenId: certificate.nftTokenId,
        txHash: certificate.txHash,
        ipfsUrl: certificate.ipfsUrl,
        certificateHash: certificate.certificateHash,
      },
    });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ valid: false, error: err.message });
  }
});

module.exports = router;