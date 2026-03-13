



import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="home cyberpunk-theme">
      {/* HUD OVERLAY ELEMENTS */}
      <div className="scanlines"></div>
      <div className="noise"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection("hero")}>
          DEGREE<span>VAULT</span>
        </div>

        <ul className="nav-links">
          <li onClick={() => scrollToSection("hero")}>Home</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("how")}>How It Works</li>
          <li onClick={() => scrollToSection("universities")}>Universities</li>
          <li onClick={() => scrollToSection("students")}>Students</li>
          <li onClick={() => scrollToSection("hr")}>HR</li>
          <li onClick={() => scrollToSection("help")}>Help</li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-glitch-container">
          <div className="hero-status">// NETWORK ACTIVE // DATA SECURE</div>
          <h1 className="glitch" data-text="SECURE ACADEMIC LEGACY">
            SECURE ACADEMIC LEGACY
          </h1>
          <h2 className="hero-subtext">Immutable Verification Protocol v1.0</h2>
          <div className="hero-buttons">
            <button className="btn-cyber" onClick={() => scrollToSection("how")}>INITIALIZE JOURNEY</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <div className="section-header">
          <span className="section-tag">/ PROTOCOL_INFO</span>
          <h2>About DegreeVault</h2>
        </div>
        <p className="cyber-p">
          DegreeVault is a blockchain-based academic certificate verification
          platform that eliminates fake degrees and enables instant trust through
          decentralized ledgers.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how" id="how">
        <div className="section-header">
          <span className="section-tag">/ VERIFICATION_FLOW</span>
          <h2>The Journey</h2>
        </div>
        
        <div className="process-container">
          <div className="steps-grid">
            {[
              { num: "01", title: "Issue", desc: "University signs and mints digital certificate." },
              { num: "02", title: "Secure", desc: "Data is hashed and stored on immutable ledger." },
              { num: "03", title: "Access", desc: "Students claim ownership via secure vault." },
              { num: "04", title: "Verify", desc: "HR scans QR to validate hash instantly." }
            ].map((step, i) => (
              <div className="step-card" key={i}>
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <div className="roles-container">
        <section className="section roles" id="universities">
          <div className="role-inner">
            <h2>For Universities</h2>
            <p>Issue tamper-proof digital certificates and reduce verification workload.</p>
            <div className="btn-group">
              <button className="btn-cyber" onClick={() => navigate("/register/university")}>REGISTER</button>
              <button className="btn-cyber outline" onClick={() => navigate("/login/university")}>LOGIN</button>
            </div>
          </div>
        </section>

        <section className="section roles" id="students">
          <div className="role-inner">
            <h2>For Students</h2>
            <p>Securely store, access, and share certificates using unique QR identifiers.</p>
            <div className="btn-group">
              <button className="btn-cyber" onClick={() => navigate("/student-register")}>CREATE VAULT</button>
              <button className="btn-cyber outline" onClick={() => navigate("/login/student")}>ACCESS</button>
            </div>
          </div>
        </section>

        <section className="section roles" id="hr">
          <div className="role-inner">
            <h2>For HR & Employers</h2>
            <p>Instantly verify certificates without contacting institutions.</p>
            <button className="btn-cyber" onClick={() => navigate("/verify")}>VERIFY NOW</button>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-line"></div>
        <p>SYSTEM STATUS: ONLINE | © 2026 DEGREEVAULT</p>
      </footer>
    </div>
  );
}