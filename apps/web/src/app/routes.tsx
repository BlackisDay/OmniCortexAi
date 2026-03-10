import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Legal from "../pages/Legal";
import AIConsole from "../pages/AIConsole";
import AppLayout from "../components/layout/AppLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/ai" element={<AIConsole />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}