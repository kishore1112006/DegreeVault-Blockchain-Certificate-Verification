const express = require("express");
const router = express.Router();

const {
  requestNonce,
  verifySignature,
} = require("../controllers/walletAuth.controller");

router.post("/request-nonce", requestNonce);
router.post("/verify-signature", verifySignature);

module.exports = router;
