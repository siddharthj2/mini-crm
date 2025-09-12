import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";

// Pages
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Customers from "./pages/CustomersPage";
import Orders from "./pages/OrdersPage";
import Campaigns from "./pages/CampaignsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar always visible except maybe on Login */}
        <Navbar />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/campaigns" element={<Campaigns />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
