const express = require("express");
const router = express.Router();

const {
  universityLogin,
  studentLogin,
  hrLogin,
} = require("../controllers/auth.controller");

// Login routes
router.post("/login/university", universityLogin);
router.post("/login/student", studentLogin);
router.post("/login/hr", hrLogin);

module.exports = router;
