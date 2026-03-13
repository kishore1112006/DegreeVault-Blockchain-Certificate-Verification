const { ethers } = require("ethers");
const crypto = require("crypto");
const Certificate = require("../models/Certificate");
const University = require("../models/University");
const abi = require("../blockchain/DegreeNFT.abi.json");
const { uploadToIPFS } = require("../services/ipfs.service");

exports.issueCertificate = async (req, res) => {
  try {
    const {
      studentRegNo,
      studentWallet,
      course,
      yearOfPassing,
      grade,
    } = req.body;

    // 1️⃣ Validate file
    if (!req.file) {
      return res.status(400).json({ message: "Certificate file required" });
    }

    // 2️⃣ Fetch university
    const university = await University.findById(req.university.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    // 3️⃣ Hash certificate (BUFFER)
    const certificateHash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    // 4️⃣ Upload to IPFS (BUFFER)
    const ipfsUrl = await uploadToIPFS(
      req.file.buffer,
      req.file.originalname
    );

    // 5️⃣ Blockchain setup
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contract = new ethers.Contract(
      process.env.DEGREE_NFT_ADDRESS,
      abi,
      wallet
    );

    // 6️⃣ Mint NFT
const tx = await contract.mintDegree(
  studentWallet,
  certificateHash,
  course,
  yearOfPassing,
  university.name
);

// wait for blockchain confirmation
const receipt = await tx.wait();

// 🔥 Extract tokenId from Transfer event
const transferEvent = receipt.logs.find(
  log => log.fragment && log.fragment.name === "Transfer"
);

if (!transferEvent) {
  throw new Error("Transfer event not found");
}

const tokenId = transferEvent.args.tokenId.toString();

    // 7️⃣ Save to MongoDB (WITH ipfsUrl)
   const cert = await Certificate.create({
  studentRegNo,
  studentWallet,
  universityId: university._id,
  course,
  yearOfPassing,
  grade,
  certificateHash,
  nftTokenId: tokenId, // ✅ CORRECT token ID
  txHash: tx.hash,
  ipfsUrl,
});

    // 8️⃣ Response
    res.status(201).json({
      message: "Certificate uploaded to IPFS & minted on blockchain",
      certificate: cert,
    });

  } catch (err) {
    console.error("❌ Issue Certificate Error:", err);
    res.status(500).json({ error: err.message });
  }
};