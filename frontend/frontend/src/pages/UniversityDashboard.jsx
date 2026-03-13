import { useNavigate } from "react-router-dom";
import "./UniversityDashboard.css";

export default function UniversityDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>University Dashboard</h1>
      <p>Issue and manage academic certificates</p>

      <div className="cards">
        <div className="card" onClick={() => navigate("/university/issue")}>
          <h3>Upload Certificate</h3>
          <p>Create blockchain certificates</p>
        </div>

        <div className="card" onClick={() => navigate("/university/certificates")}>
          <h3>View Certificates</h3>
          <p>See issued certificates</p>
        </div>
      </div>
    </div>
  );
}