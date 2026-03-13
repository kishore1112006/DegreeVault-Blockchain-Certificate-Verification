const express = require("express");
const router = express.Router();

const { registerStudent } = require("../controllers/student.controller");
const Student = require("../models/Student");
const authStudent = require("../middleware/authStudent");

// 🔹 STUDENT REGISTRATION
router.post("/register", registerStudent);

// 🔹 GET LOGGED-IN STUDENT PROFILE
router.get("/me", authStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.student.regNo })
      .select("-otp -otpExpiresAt -nonce -__v");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
