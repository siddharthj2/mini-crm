import { useEffect, useState } from "react";
import customerApi from "../../api/customerApi";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await customerApi.getAll();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p className="text-neutral-400">Loading customers...</p>;
  if (!customers.length) return <p className="text-neutral-400">No customers found</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">All Customers</h3>
      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/50">
        <table className="min-w-full text-sm">
          <thead className="text-neutral-300">
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Phone</th>
            </tr>
          </thead>
          <tbody className="text-neutral-200">
            {customers.map((c) => (
              <tr key={c._id} className="border-t border-neutral-800">
                <td className="py-2 px-4">{c.name}</td>
                <td className="py-2 px-4">{c.email}</td>
                <td className="py-2 px-4">{c.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
