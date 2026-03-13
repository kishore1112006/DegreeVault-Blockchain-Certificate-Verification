import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"

export default function UniversityRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    walletAddress: "",
    idProofUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/university/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registration submitted. Wait for admin approval.");
      navigate("/login/university");
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>University Registration</h2>
        <p>Apply to issue blockchain certificates</p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="University Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Official Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="walletAddress" placeholder="University Wallet Address" onChange={handleChange} required />
          <input name="idProofUrl" placeholder="ID Proof URL (PDF/Image link)" onChange={handleChange} required />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}