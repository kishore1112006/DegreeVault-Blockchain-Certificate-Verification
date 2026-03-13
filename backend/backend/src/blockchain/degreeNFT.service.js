const { ethers } = require("ethers");
const abi = require("./DegreeNFT.abi.json");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

const wallet = new ethers.Wallet(
  process.env.BLOCKCHAIN_PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.DEGREE_NFT_ADDRESS,
  abi,
  wallet
);

exports.mintDegreeNFT = async ({
  studentWallet,
  certificateHash,
  course,
  yearOfPassing,
  universityName,
}) => {
  const tx = await contract.mintDegree(
    studentWallet,
    certificateHash,
    course,
    yearOfPassing,
    universityName
  );

  const receipt = await tx.wait();

  return {
    txHash: receipt.transactionHash,
  };
};