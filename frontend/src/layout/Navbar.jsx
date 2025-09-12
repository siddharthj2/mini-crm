import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">MiniCRM</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/customers" className="hover:underline">Customers</Link>
        <Link to="/orders" className="hover:underline">Orders</Link>
        <Link to="/campaigns" className="hover:underline">Campaigns</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}
