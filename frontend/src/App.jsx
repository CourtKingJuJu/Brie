import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PatientChart from "./pages/PatientChart";
import ORReport from "./pages/ORReport";
import Phone from "./pages/Phone";
import Handoff from "./pages/Handoff";

function PatientsPage() {
  return <Dashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Main dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Patient list */}
          <Route path="/patients" element={<PatientsPage />} />

          {/* Individual patient chart */}
          <Route
            path="/patients/:patientId"
            element={<PatientChart />}
          />

          {/* OR Preparation */}
          <Route path="/or" element={<ORReport />} />

          {/* Phone */}
          <Route path="/phone" element={<Phone />} />

          {/* Handoff */}
          <Route path="/handoff" element={<Handoff />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;