import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [regNo, setRegNo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMetaMaskLogin = async () => {
    try {
      setError("");
      setLoading(true);

      if (!window.ethereum) {
        setError("MetaMask not installed");
        setLoading(false);
        return;
      }

      // 1️⃣ Connect MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 2️⃣ Request nonce from backend
      const nonceRes = await fetch(
        "http://localhost:5000/api/wallet/request-nonce",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regNo }),
        }
      );

      const nonceData = await nonceRes.json();
      if (!nonceRes.ok) {
        setError(nonceData.message || "Nonce request failed");
        setLoading(false);
        return;
      }

      const nonce = nonceData.nonce;

      // 3️⃣ Sign nonce using MetaMask
      const signature = await signer.signMessage(nonce);

      // 4️⃣ Send signature to backend
      const verifyRes = await fetch(
        "http://localhost:5000/api/wallet/verify-signature",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regNo, signature }),
        }
      );

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setError(verifyData.message || "Wallet verification failed");
        setLoading(false);
        return;
      }

      // 5️⃣ Save JWT token
      localStorage.setItem("token", verifyData.token);

      // 6️⃣ Redirect to student dashboard
      navigate("/student/dashboard");
    } catch (err) {
      setError("MetaMask login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Login</h2>
        <p className="subtitle">
          Login securely using MetaMask wallet
        </p>

        <input
          type="text"
          placeholder="University Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleMetaMaskLogin} disabled={loading}>
          {loading ? "Connecting..." : "Login with MetaMask"}
        </button>
      </div>
    </div>
  );
}
