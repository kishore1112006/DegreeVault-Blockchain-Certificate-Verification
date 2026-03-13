import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function UniversityLogin() {
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
    const res = await fetch("http://localhost:5000/api/university/login", {
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

    // OPTIONAL (recommended): save token
    localStorage.setItem("token", data.token);

    // success
    navigate("/university/dashboard");
  } catch (err) {
    setError("Server error. Try again.");
  }

  setLoading(false);
};

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>University Login</h2>
        <p className="subtitle">
          Authorized university administrators only
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="University Email"
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
