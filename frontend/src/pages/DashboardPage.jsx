import { useEffect, useMemo, useState } from "react";
import campaignApi from "../api/campaignApi";
import customerApi from "../api/customerApi";
import orderApi from "../api/orderApi";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, custRes, orderRes] = await Promise.all([
          campaignApi.getAll(),
          customerApi.getAll(),
          orderApi.getAll().catch(() => ({ data: [] })),
        ]);
        setCampaigns(dashRes.data?.campaigns || []);
        setCustomersCount(Array.isArray(custRes.data) ? custRes.data.length : 0);
        setOrdersCount(Array.isArray(orderRes.data) ? orderRes.data.length : 0);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const totals = useMemo(() => {
    return campaigns.reduce(
      (acc, c) => {
        acc.sent += c.stats?.sent || 0;
        acc.failed += c.stats?.failed || 0;
        acc.total += c.stats?.total || 0;
        return acc;
      },
      { sent: 0, failed: 0, total: 0 }
    );
  }, [campaigns]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Customers" value={customersCount} />
        <StatCard label="Total Orders" value={ordersCount} />
        <StatCard label="Total Campaigns" value={campaigns.length} />
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-300">AI</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">AI Summary</h3>
              {!loading && (
                <div className="text-sm text-neutral-400">Sent: {totals.sent} • Failed: {totals.failed} • Total: {totals.total}</div>
              )}
            </div>
            {loading ? (
              <p className="text-neutral-400 mt-2">Analyzing...</p>
            ) : (
              <p className="text-neutral-300 leading-relaxed mt-2">
                {campaigns[0]?.summary
                  ? campaigns[0].summary
                  : `You have ${campaigns.length} campaigns. Messages sent: ${totals.sent}, failed: ${totals.failed}.`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
    </div>
  );
}