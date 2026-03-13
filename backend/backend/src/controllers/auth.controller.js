const { generateToken } = require("../middleware/jwt.js");

exports.universityLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@university.com" && password === "admin123") {
    const token = generateToken({
      role: "university",
      email,
    });

    return res.json({
      message: "University login successful",
      token,
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

exports.studentLogin = (req, res) => {
  const { regNo, phone } = req.body;

  const token = generateToken({
    role: "student",
    regNo,
  });

  res.json({
    message: "Student login successful",
    token,
  });
};

exports.hrLogin = (req, res) => {
  const { email } = req.body;

  const token = generateToken({
    role: "hr",
    email,
  });

  res.json({
    message: "HR login successful",
    token,
  });
};
