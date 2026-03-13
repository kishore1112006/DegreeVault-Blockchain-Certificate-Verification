const JWT_SECRET = "degreevault_secret";

const Student = require("../models/Student");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");


// REQUEST NONCE
exports.requestNonce = async (req, res) => {
  try {
    const { regNo } = req.body;

    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.isVerified) {
      return res.status(403).json({ message: "Student not verified" });
    }

    const nonce = `Login to DegreeVault: ${Math.floor(
      Math.random() * 1000000
    )}`;

    student.nonce = nonce;
    await student.save();

    res.json({ nonce });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// VERIFY SIGNATURE + LOGIN
exports.verifySignature = async (req, res) => {
  try {
    const { regNo, signature } = req.body;

    const student = await Student.findOne({ regNo });
    if (!student || !student.nonce) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const recoveredAddress = ethers.verifyMessage(
  student.nonce,
  signature
);



if (
  recoveredAddress.toLowerCase() !==
  student.walletAddress.toLowerCase()
) {
  return res.status(401).json({ message: "Wallet verification failed" });
}


    // clear nonce AFTER verification
    student.nonce = null;
    await student.save();

    // ISSUE JWT
    const token = jwt.sign(
  {
    role: "student",
    regNo: student.regNo,
    walletAddress: student.walletAddress,
  },
  JWT_SECRET,
  { expiresIn: "1d" }
);


    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
