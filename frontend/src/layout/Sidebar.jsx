import { NavLink } from "react-router-dom";

const navItemBase = "flex items-center gap-3 px-3 py-2 rounded-md text-sm";
const navItemStyle = ({ isActive }) =>
  `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : "text-neutral-300 hover:bg-neutral-900 hover:text-white"}`;

export default function Sidebar() {
  return (
    <aside className="h-full w-60 shrink-0 border-r border-neutral-800 bg-neutral-900/70 backdrop-blur pt-4">
      <div className="px-4 pb-4">
        <div className="text-white font-semibold tracking-wide">CRM</div>
      </div>
      <nav className="px-3 space-y-1">
        <NavLink to="/dashboard" className={navItemStyle}>
          <span className="i">🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/customers" className={navItemStyle}>
          <span className="i">👤</span>
          <span>Customers</span>
        </NavLink>
        <NavLink to="/orders" className={navItemStyle}>
          <span className="i">📦</span>
          <span>Orders</span>
        </NavLink>
        <NavLink to="/campaigns" className={navItemStyle}>
          <span className="i">📣</span>
          <span>Campaign</span>
        </NavLink>
        <NavLink to="/campaign-history" className={navItemStyle}>
          <span className="i">🕘</span>
          <span>Campaign History</span>
        </NavLink>
        <a href="http://localhost:8000/auth/logout" className={`${navItemBase} text-red-400 hover:bg-red-950/40 hover:text-red-300`}>
          <span className="i">↪</span>
          <span>Logout</span>
        </a>
      </nav>
      <div className="mt-auto" />
    </aside>
  );
}


