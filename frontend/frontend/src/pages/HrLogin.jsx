import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function HrLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login/hr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // success → later HR verification dashboard
      navigate("/verify");
    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>HR / Employer Login</h2>
        <p className="subtitle">
          Verify academic certificates instantly
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
