import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Customers from "./pages/CustomersPage";
import Orders from "./pages/OrdersPage";
import Campaigns from "./pages/CampaignsPage";
import CampaignHistory from "./pages/CampaignHistoryPage";

function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {!isLogin && <Navbar />}
      <div className="flex flex-1">
        {!isLogin && <Sidebar />}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaign-history" element={<CampaignHistory />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
