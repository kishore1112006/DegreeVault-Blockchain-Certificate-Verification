const Student = require("../models/Student");
const { generateOTP } = require("../utils/otp");

// SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    const { regNo } = req.body;

    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const otp = generateOTP();

    student.otp = otp;
    student.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    await student.save();

    console.log("OTP for student:", otp); // mock OTP sending

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { regNo, otp } = req.body;

    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (
      student.otp !== otp ||
      student.otpExpiresAt < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    student.isVerified = true;
    student.otp = null;
    student.otpExpiresAt = null;

    await student.save();

    res.json({ message: "Student verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
