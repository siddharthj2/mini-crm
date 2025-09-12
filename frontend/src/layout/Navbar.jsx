import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 text-neutral-100 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">MiniCRM</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-white/90">Dashboard</Link>
        <Link to="/customers" className="hover:text-white/90">Customers</Link>
        <Link to="/orders" className="hover:text-white/90">Orders</Link>
        <Link to="/campaigns" className="hover:text-white/90">Campaigns</Link>
        <Link to="/login" className="hover:text-white/90">Login</Link>
      </div>
    </nav>
  );
}
