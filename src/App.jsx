import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PatientChart from "./pages/PatientChart";

function PatientsPage() {
  return <Dashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:patientId" element={<PatientChart />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;