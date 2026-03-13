import { useState } from "react";
import "./Verify.css";

export default function Verify() {
  const [mode, setMode] = useState("tokenId");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCertificate = async () => {
    if (!value.trim()) {
      setError("Please enter a value");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/verify?${mode}=${value}`
      );
      const data = await res.json();

      if (!data.valid) {
        setError("❌ Certificate not found or invalid");
      } else {
        setResult(data.certificate);
      }
    } catch {
      setError("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>HR Certificate Verification</h2>
      <p className="subtitle">
        Verify certificates using Blockchain & IPFS
      </p>

      {/* SEARCH TYPE */}
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="tokenId">NFT Token ID</option>
        <option value="txHash">Transaction Hash</option>
        <option value="certificateHash">Certificate Hash</option>
      </select>

      {/* INPUT */}
      <input
        type="text"
        placeholder={
          mode === "tokenId"
            ? "Enter NFT Token ID (e.g. 7)"
            : mode === "txHash"
            ? "Enter Blockchain Transaction Hash"
            : "Enter Certificate Hash (SHA-256)"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={verifyCertificate} disabled={loading}>
        {loading ? "Verifying..." : "Verify Certificate"}
      </button>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="result-card">
          <h3>✅ Certificate Verified</h3>

          <p><b>University:</b> {result.university}</p>
          <p><b>Course:</b> {result.course}</p>
          <p><b>Year:</b> {result.year}</p>
          <p><b>Grade:</b> {result.grade}</p>
          <p><b>NFT Token ID:</b> {result.nftTokenId}</p>

          <a
            href={`https://sepolia.etherscan.io/tx/${result.txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            🔗 View Blockchain Proof
          </a>

          <br />

          <a href={result.ipfsUrl} target="_blank" rel="noreferrer">
            📄 View Certificate (IPFS)
          </a>
        </div>
      )}
    </div>
  );
}