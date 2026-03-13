const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const authStudent = require("../middleware/authStudent");

router.get("/my-certificates", authStudent, async (req, res) => {
  try {
    console.log("JWT STUDENT:", req.student);

    const certificates = await Certificate.find({
      studentRegNo: req.student.regNo   // 🔥 THIS MATCHES DB
    }).populate("universityId", "name");

    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
