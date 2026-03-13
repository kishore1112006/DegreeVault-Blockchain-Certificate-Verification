import { useState } from "react";
import axios from "axios";
import "./Register.css"

const StudentRegister = () => {
  const [form, setForm] = useState({
    name: "",
    regNo: "",
    email: "",
    phone: "",
    walletAddress: "",
    universityEmail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        form
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="regNo"
          placeholder="Registration Number"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Student Email"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="walletAddress"
          placeholder="Wallet Address (0x...)"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="universityEmail"
          placeholder="University Official Email"
          required
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <p style={{ marginTop: "10px" }}>
          Already registered? <a href="/student-login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default StudentRegister;