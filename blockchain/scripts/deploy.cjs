const { ethers } = require("hardhat");

async function main() {
  const DegreeNFT = await ethers.getContractFactory("DegreeNFT");
  const degreeNFT = await DegreeNFT.deploy();

  await degreeNFT.deployed();

  console.log("DegreeNFT deployed to:", degreeNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});