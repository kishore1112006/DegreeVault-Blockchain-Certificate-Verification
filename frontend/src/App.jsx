import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import UniversityLogin from "./pages/UniversityLogin";
import StudentLogin from "./pages/StudentLogin";
import HrLogin from "./pages/HrLogin";
import UniversityDashboard from "./pages/UniversityDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import IssueCertificate from "./pages/IssueCertificate";
import Verify from "./pages/Verify";

import UniversityCertificates from "./pages/UniversityCertificates";

import UniversityRegister from "./pages/UniversityRegister";
import StudentRegister from "./pages/StudentRegister"



export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login/university" element={<UniversityLogin />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/hr" element={<HrLogin />} />
     <Route path="/verify" element={<Verify />} />


      {/* UNIVERSITY DASHBOARD */}
      <Route
        path="/university/dashboard"
        element={
          <ProtectedRoute role="university">
            <UniversityDashboard />
          </ProtectedRoute>
        }
      />

      {/* ISSUE CERTIFICATE */}
      <Route
        path="/university/issue"
        element={
          <ProtectedRoute role="university">
            <IssueCertificate />
          </ProtectedRoute>
        }
      />

      {/* STUDENT DASHBOARD */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/university/certificates"
  element={
    <ProtectedRoute role="university">
      <UniversityCertificates />
    </ProtectedRoute>
  }
/>


<Route path="/register/university" element={<UniversityRegister />} />

<Route path="/student-register" element={<StudentRegister />} />
    </Routes>
  );
}





