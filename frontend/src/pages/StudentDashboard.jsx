import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/student/my-certificates", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setCertificates(data));
  }, []);

  return (
    <div className="vault-container">
      {/* HUD OVERLAY ELEMENTS */}
      <div className="scanlines"></div>
      <div className="noise"></div>

      <div className="vault-content">
        <div className="section-header">
          <span className="section-tag">/ SECURE_IDENTITY_VAULT</span>
          <h2>My Certificates</h2>
        </div>

        {certificates.length === 0 && (
          <p className="status-msg">// NO ASSETS FOUND IN VAULT</p>
        )}

        <div className="vault-list">
          {certificates.map(cert => (
            <div key={cert._id} className="vault-card">
              <div className="cert-preview">
                {cert.ipfsUrl && (
                  <img src={cert.ipfsUrl} alt="Certificate" className="cert-img" />
                )}
                <div className="cert-badge">MINTED</div>
              </div>

              <div className="cert-details">
                <div className="detail-row">
                  <span>UNIVERSITY:</span> <strong>{cert.universityId?.name}</strong>
                </div>
                <div className="detail-row">
                  <span>COURSE:</span> <strong>{cert.course}</strong>
                </div>
                <div className="detail-row">
                  <span>YEAR:</span> <strong>{cert.yearOfPassing}</strong>
                </div>
                <div className="detail-row highlight">
                  <span>NFT TOKEN ID:</span> <strong>{cert.nftTokenId}</strong>
                </div>

                <div className="action-links">
                  <a
                    href={`https://sepolia.etherscan.io/token/${import.meta.env.VITE_DEGREE_NFT_ADDRESS}?a=${cert.nftTokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-link"
                  >
                    🔗 ETHERSCAN
                  </a>
                  <a href={cert.ipfsUrl} target="_blank" rel="noreferrer" className="cyber-link">
                    📄 IPFS DATA
                  </a>
                </div>
              </div>

              <div className="verification-zone">
                <div className="qr-wrapper">
                  <QRCodeCanvas
                    value={`https://sepolia.etherscan.io/token/${import.meta.env.VITE_DEGREE_NFT_ADDRESS}?a=${cert.nftTokenId}`}
                    size={120}
                    bgColor={"transparent"}
                    fgColor={"#00f3ff"}
                  />
                </div>
                <p className="qr-label">SCAN_TO_VERIFY</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}