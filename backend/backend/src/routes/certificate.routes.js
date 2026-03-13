const express = require("express");
const router = express.Router();

const { issueCertificate } = require("../controllers/certificate.controller");
const authUniversity = require("../middleware/authUniversity");
const upload = require("../middleware/upload");
const Certificate = require("../models/Certificate");

/**
 * ===============================
 * ISSUE CERTIFICATE (University)
 * ===============================
 */
router.post(
  "/issue",
  authUniversity,
  upload.single("certificate"), // PDF / Image
  issueCertificate
);

/**
 * ===============================
 * GET UNIVERSITY CERTIFICATES
 * ===============================
 */
router.get("/university", authUniversity, async (req, res) => {
  try {
    const certs = await Certificate.find({
      universityId: req.university.id,
    }).sort({ createdAt: -1 });

    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;