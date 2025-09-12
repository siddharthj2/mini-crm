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
    const sums = campaigns.reduce(
      (acc, c) => {
        acc.sent += c.stats?.sent || 0;
        acc.failed += c.stats?.failed || 0;
        acc.total += c.stats?.total || 0;
        return acc;
      },
      { sent: 0, failed: 0, total: 0 }
    );
    const segments = new Set(
      campaigns.map((c) => JSON.stringify(c.rules || {}))
    ).size;
    return { ...sums, segments };
  }, [campaigns]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Customers" value={customersCount} />
        <StatCard label="Total Orders" value={ordersCount} />
        <StatCard label="Segments" value={totals.segments} />
        <StatCard label="Total Campaigns" value={campaigns.length} />
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">AI Summary</h3>
        {loading ? (
          <p className="text-neutral-400">Analyzing...</p>
        ) : (
          <p className="text-neutral-300 leading-relaxed">
            {campaigns[0]?.summary
              ? campaigns[0].summary
              : `You have ${campaigns.length} campaigns with ${totals.sent} messages sent and ${totals.failed} failed so far.`}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Recent Campaigns</h3>
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-neutral-400">No campaigns yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-neutral-300">
                <tr>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Summary</th>
                  <th className="text-left py-2 pr-4">Sent</th>
                  <th className="text-left py-2 pr-4">Failed</th>
                  <th className="text-left py-2 pr-4">Total</th>
                </tr>
              </thead>
              <tbody className="text-neutral-200">
                {campaigns.slice(0, 10).map((c) => (
                  <tr key={c._id} className="border-t border-neutral-800">
                    <td className="py-2 pr-4">{c.name}</td>
                    <td className="py-2 pr-4 max-w-[420px] truncate">{c.summary}</td>
                    <td className="py-2 pr-4">{c.stats?.sent ?? 0}</td>
                    <td className="py-2 pr-4">{c.stats?.failed ?? 0}</td>
                    <td className="py-2 pr-4">{c.stats?.total ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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