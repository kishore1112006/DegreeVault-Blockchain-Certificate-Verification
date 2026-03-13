import { useEffect, useState } from "react";
import "./UniversityCertificates.css";

export default function UniversityCertificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/certificates/university", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch(() => alert("Failed to load certificates"));
  }, []);

  return (
    <div className="ledger-container">
      {/* HUD OVERLAY ELEMENTS */}
      <div className="scanlines"></div>
      <div className="noise"></div>

      <div className="ledger-box">
        <div className="section-header">
          <span className="section-tag">/ ISSUANCE_LOG</span>
          <h2>Issued Certificates</h2>
        </div>

        {certificates.length === 0 && (
          <p className="status-msg">// NO DATA FOUND IN LEDGER</p>
        )}

        <div className="ledger-list">
          {certificates.map((cert) => (
            <div key={cert._id} className="ledger-item">
              <div className="ledger-content">
                <div className="ledger-row">
                  <span>STUDENT REG NO:</span> <strong>{cert.studentRegNo}</strong>
                </div>
                <div className="ledger-row">
                  <span>COURSE:</span> <strong>{cert.course}</strong>
                </div>
                <div className="ledger-row">
                  <span>YEAR:</span> <strong>{cert.yearOfPassing}</strong>
                </div>
                <div className="ledger-row">
                  <span>GRADE:</span> <strong>{cert.grade}</strong>
                </div>
                <div className="ledger-row highlight">
                  <span>NFT TOKEN ID:</span> <strong>{cert.nftTokenId}</strong>
                </div>
                <div className="ledger-row technical">
                  <span>TX HASH:</span> <code>{cert.txHash}</code>
                </div>
              </div>
              <div className="item-status">VERIFIED</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}