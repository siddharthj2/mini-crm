import { useEffect, useState } from "react";
import campaignApi from "../api/campaignApi";

export default function CampaignHistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await campaignApi.getAll();
      setItems(res.data?.campaigns || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Campaign History</h2>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-neutral-400">No campaigns yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-neutral-300">
                <tr>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Message</th>
                  <th className="text-left py-2 pr-4">Sent</th>
                  <th className="text-left py-2 pr-4">Failed</th>
                  <th className="text-left py-2 pr-4">Total</th>
                </tr>
              </thead>
              <tbody className="text-neutral-200">
                {items.map((c) => (
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


