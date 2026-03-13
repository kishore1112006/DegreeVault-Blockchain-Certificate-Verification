const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const University = require("../models/University");

const JWT_SECRET = "degreevault_secret";

// University Signup
exports.registerUniversity = async (req, res) => {
  try {
    const { name, email, password, phone, walletAddress, idProofUrl } = req.body;

    const existing = await University.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "University already registered" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const university = new University({
      name,
      email,
      password: hashedPassword, // ✅ store hashed password
      phone,
      walletAddress,
      idProofUrl,
      isApproved: false,
    });

    await university.save();

    res.status(201).json({
      message: "University registered successfully. Pending approval.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// University Login (only if approved)
exports.loginUniversity = async (req, res) => {
  try {
    const { email, password } = req.body;

    const university = await University.findOne({ email });
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    if (!university.isApproved) {
      return res.status(403).json({ message: "University not approved yet" });
    }

    // 🔐 CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, university.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        role: "university",
        id: university._id,
        email: university.email,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "University login successful",
      token,
      university,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};