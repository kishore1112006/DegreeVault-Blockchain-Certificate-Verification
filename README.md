DegreeVault – Blockchain Certificate Verification
Overview

DegreeVault is a decentralized academic certificate verification system that uses Blockchain, IPFS, and NFTs to securely issue, store, and verify educational credentials.

Universities can issue tamper-proof certificates, students can own them in their wallets, and employers can instantly verify authenticity without contacting the university.

The system eliminates certificate forgery by storing certificate hashes on the Ethereum blockchain while keeping certificate files on IPFS decentralized storage.

System Architecture
University → Upload Certificate
        ↓
Backend Server (Node.js + Express)
        ↓
Generate SHA-256 Hash
        ↓
Upload Certificate → IPFS
        ↓
Store Hash + Metadata → Ethereum Blockchain
        ↓
Mint NFT Certificate → Student Wallet
        ↓
Generate QR Code
        ↓
Employer Verification
Tech Stack
Frontend

React (Vite)

CSS

Axios

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Multer (File Upload)

Blockchain

Solidity Smart Contracts

Hardhat

Ethers.js

MetaMask

Storage

IPFS (InterPlanetary File System)

Key Features
Secure Certificate Issuance

Universities can issue digital certificates which are hashed and stored on the blockchain to prevent tampering.

NFT Certificate Ownership

Each certificate is minted as an NFT and assigned to the student’s wallet.

Decentralized Storage

Certificates are stored on IPFS, ensuring secure and permanent storage.

Instant Verification

Employers can verify certificates instantly using QR codes or blockchain records.

Wallet Authentication

Students access certificates securely using MetaMask wallet login.

Project Structure
DegreeVault
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── middleware
│   │   ├── services
│   │   └── server.js
│
├── blockchain
│   ├── contracts
│   │   └── DegreeNFT.sol
│   ├── scripts
│   │   └── deploy.cjs
│   └── hardhat.config.cjs
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   └── utils
    └── vite.config.js
How It Works

University uploads certificate through the web dashboard

Backend generates SHA-256 hash of the certificate

Certificate file is stored on IPFS

Hash and metadata are stored on the Ethereum blockchain

NFT certificate is minted to the student's wallet

QR code is generated for verification

Employers scan the QR code to verify authenticity

Installation
Clone Repository
git clone https://github.com/kishore1112006/DegreeVault-Blockchain-Certificate-Verification.git
cd DegreeVault-Blockchain-Certificate-Verification
Backend Setup
cd backend
npm install
node src/server.js
Blockchain Setup
Start Hardhat Network
cd blockchain
npx hardhat node
Deploy Smart Contract
npx hardhat run scripts/deploy.cjs --network localhost
Frontend Setup
cd frontend
npm install
npm run dev

Open in browser:

http://localhost:5173
Environment Variables

Create .env files in backend, frontend, and blockchain folders.

Example backend .env:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
IPFS_API_URL=your_ipfs_url
CONTRACT_ADDRESS=deployed_contract_address
Future Improvements

Multi-University support

Certificate revocation system

Public verification portal

Mobile application integration

License

This project is licensed under the MIT License.

Author

Kishore M
B.Tech Computer Science
Alliance College of Engineering and Design

GitHub:
https://github.com/kishore1112006
