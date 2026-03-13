import { useState, useEffect } from "react";
import "./IssueCertificate.css";

export default function IssueCertificate() {
  const [form, setForm] = useState({
    studentRegNo: "",
    studentWallet: "",
    course: "",
    yearOfPassing: "",
    grade: "",
    file: null,
  });

  // Logic to handle 3D tilt based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = document.querySelector(".issue-box");
      if (!card) return;
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) {
      alert("Please upload certificate file");
      return;
    }

    const formData = new FormData();
    formData.append("studentRegNo", form.studentRegNo);
    formData.append("studentWallet", form.studentWallet);
    formData.append("course", form.course);
    formData.append("yearOfPassing", form.yearOfPassing);
    formData.append("grade", form.grade);
    formData.append("certificate", form.file);

    try {
      const res = await fetch("http://localhost:5000/api/certificates/issue", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="issue-container">
      {/* HUD OVERLAY ELEMENTS */}
      <div className="scanlines"></div>
      <div className="noise"></div>

      <div className="issue-box">
        <div className="section-header">
          <span className="section-tag">/ MINTING_PROTOCOL</span>
          <h2>Issue Certificate</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="studentRegNo"
            placeholder="STUDENT REG NO"
            onChange={handleChange}
            required
          />
          <input
            name="studentWallet"
            placeholder="STUDENT WALLET ADDRESS (0x...)"
            onChange={handleChange}
            required
          />
          <input
            name="course"
            placeholder="COURSE / DEGREE"
            onChange={handleChange}
            required
          />
          <input
            name="yearOfPassing"
            placeholder="YEAR OF PASSING"
            onChange={handleChange}
            required
          />
          <input
            name="grade"
            placeholder="GRADE / GPA"
            onChange={handleChange}
            required
          />
          
          <div className="file-upload-wrapper">
            <label htmlFor="file-input" className="file-label">
              {form.file ? form.file.name : "UPLOAD DIGITAL ASSET (.PDF/IMG)"}
            </label>
            <input
              id="file-input"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn-cyber">
            INITIALIZE MINTING
          </button>
        </form>
      </div>
    </div>
  );
}