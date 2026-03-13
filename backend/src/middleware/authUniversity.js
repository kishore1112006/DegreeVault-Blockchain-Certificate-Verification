const jwt = require("jsonwebtoken");

const JWT_SECRET = "degreevault_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ensure only university can access
    if (decoded.role !== "university") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.university = decoded; // contains universityId, email, role
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
