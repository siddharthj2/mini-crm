import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getAll();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-neutral-400">Loading orders...</p>;
  if (!orders.length) return <p className="text-neutral-400">No orders found</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">All Orders</h3>
      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/50">
        <table className="min-w-full text-sm">
          <thead className="text-neutral-300">
            <tr>
              <th className="text-left py-2 px-4">Customer</th>
              <th className="text-left py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody className="text-neutral-200">
            {orders.map((o) => {
              const customerName = o.customerId?.name || o.customerId || "-";
              return (
                <tr key={o._id} className="border-t border-neutral-800">
                  <td className="py-2 px-4">{customerName}</td>
                  <td className="py-2 px-4">{o.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
