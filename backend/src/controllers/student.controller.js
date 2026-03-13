const Student = require("../models/Student");
const University = require("../models/University");

// Student Signup
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      regNo,
      email,
      phone,
      walletAddress,
      universityEmail,
    } = req.body;

    // Find university by email
    const university = await University.findOne({ email: universityEmail });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    if (!university.isApproved) {
      return res.status(403).json({ message: "University not approved" });
    }

    const existingStudent = await Student.findOne({ regNo });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const student = new Student({
      name,
      regNo,
      email,
      phone,
      walletAddress,
      universityId: university._id,
      isVerified: false,
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully. Verification pending.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
