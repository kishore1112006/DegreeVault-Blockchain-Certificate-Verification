require("dotenv").config();
console.log("🚀 server.js file loaded");

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const universityRoutes = require("./routes/university.routes");
const studentRoutes = require("./routes/student.routes");
const studentOtpRoutes = require("./routes/studentOtp.routes");
const walletAuthRoutes = require("./routes/walletAuth.routes");
const certificateRoutes = require("./routes/certificate.routes");
const studentCertRoutes = require("./routes/studentCertificates.routes");
const verifyRoutes = require("./routes/verify.routes"); // ✅

const app = express();

// CONNECT DATABASE
connectDB();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/student", studentOtpRoutes);
app.use("/api/student", studentCertRoutes);
app.use("/api/wallet", walletAuthRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/verify", verifyRoutes); // ✅ MOVE HERE

app.get("/", (req, res) => {
  res.send("DegreeVault Backend API is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});